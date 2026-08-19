/**
 * generate-qa.ts
 *
 * Reads all articles from content/articles + content/security, sends each to
 * Gemini, and generates SEO-optimized Q&A pairs. Writes results back into
 * the markdown frontmatter.
 *
 * Free-tier Gemini 3.6 Flash has ~20 requests/day — use --limit 20 (default).
 * The script auto-stops on 429 and resumes on next run (skips articles that
 * already have >= 3 qaPairs).
 *
 * Usage:
 *   npx tsx scripts/generate-qa.ts                     # generate up to 20 (free-tier safe)
 *   npx tsx scripts/generate-qa.ts --limit 5           # process only 5 articles
 *   npx tsx scripts/generate-qa.ts --dry-run           # no file writes
 *   npx tsx scripts/generate-qa.ts --slug my-article   # single article
 */
import { config } from 'dotenv';
import { resolve } from 'node:path';
config({ path: resolve(process.cwd(), '.env.local') });
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const DRY_RUN = process.argv.includes('--dry-run');
const slugArg = process.argv.find((a, i) => process.argv[i - 1] === '--slug');
const limitArg = process.argv.find((a, i) => process.argv[i - 1] === '--limit');
const DAILY_LIMIT = limitArg ? parseInt(limitArg, 10) : 20;

if (!GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY env var is required.\n');
  console.error('Usage: GEMINI_API_KEY=AIzaSy... npx tsx scripts/generate-qa.ts');
  process.exit(1);
}

const contentDirs = [
  join(process.cwd(), 'content/articles'),
  join(process.cwd(), 'content/security'),
];

const SYSTEM_PROMPT = `You are an SEO content strategist for Kameralog Malaysia — a camera gear and content creation resource for Malaysian creators.

Your job: Given an article's title, description, and content, generate 5 SEO-optimized Q&A pairs.

Rules:
1. Questions must be things REAL PEOPLE would type into Google (not abstract/academic).
2. Questions should be specific to the article's topic and Malaysian context.
3. Answers should be 2-3 sentences, factual, and directly from the article content.
4. Include RM prices when relevant.
5. Mix English and Malay questions if the article is in Malay.
6. Questions should target long-tail search queries (conversational, specific).
7. Each answer should be self-contained (makes sense without reading the article).
8. CRITICAL: Keep all answers on a single line — do NOT insert literal newlines inside JSON strings. Use sentences, not paragraphs.
9. CRITICAL: Output ONLY a valid JSON array. No markdown fences, no commentary, no extra text.`;

async function generateQA(
  title: string,
  description: string,
  content: string,
): Promise<{ question: string; answer: string }[]> {
  const truncated = content.slice(0, 8000);
  const userPrompt = `Article: "${title}"
Description: ${description}

Content:
${truncated}

Generate 5 Q&A pairs for this article. Target questions Malaysian creators would actually search on Google.`;

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1500,
        topP: 0.8,
        responseMimeType: 'application/json',
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      ],
    }),
  });

  if (res.status === 429) {
    const errBody = await res.json().catch(() => ({}));
    const retryDelay = errBody?.error?.details?.find(
      (d: any) => d['@type']?.includes('RetryInfo'),
    )?.retryDelay;
    const waitSec = retryDelay ? parseInt(retryDelay.replace('s', ''), 10) : 60;
    throw new Error(`QUOTA_EXCEEDED:${waitSec}`);
  }

  if (res.status === 503) {
    throw new Error('TRANSIENT:503');
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error('Empty response from Gemini');

  // Strip markdown fences
  let cleaned = text.replace(/```json\n?|\n?```/g, '').trim();

  // Repair common JSON issues: newlines inside strings
  // Strategy: find strings and replace internal newlines
  function repairJson(s: string): string {
    let result = '';
    let inString = false;
    let escaped = false;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (escaped) { result += ch; escaped = false; continue; }
      if (ch === '\\') { result += ch; escaped = true; continue; }
      if (ch === '"') { inString = !inString; result += ch; continue; }
      if (inString && (ch === '\n' || ch === '\r')) { result += ' '; continue; }
      result += ch;
    }
    // Fix trailing commas before ] or }
    result = result.replace(/,\s*([\]}])/g, '$1');
    return result;
  }

  cleaned = repairJson(cleaned);

  // Try direct parse first
  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Fallback: extract individual {"question":...,"answer":...} objects
    const pairs: { question: string; answer: string }[] = [];
    const objRegex = /\{[^{}]*"question"\s*:\s*"([^"]*(?:\\.[^"]*)*)"[^{}]*"answer"\s*:\s*"([^"]*(?:\\.[^"]*)*)"[^{}]*\}/g;
    let match;
    while ((match = objRegex.exec(cleaned)) !== null) {
      pairs.push({
        question: match[1].replace(/\\"/g, '"'),
        answer: match[2].replace(/\\"/g, '"'),
      });
    }
    if (pairs.length === 0) {
      // Last resort: try to parse each line as individual JSON objects
      const lines = cleaned.split('\n');
      let buffer = '';
      for (const line of lines) {
        buffer += line;
        try {
          const obj = JSON.parse(buffer.trim());
          if (obj.question && obj.answer) pairs.push(obj);
          buffer = '';
        } catch {
          if (line.includes('}')) buffer = '';
        }
      }
    }
    if (pairs.length === 0) throw new Error(`Could not parse Q&A pairs from response: ${cleaned.slice(0, 300)}`);
    return pairs;
  }

  if (!Array.isArray(parsed)) throw new Error('Response is not an array');
  return parsed.filter(
    (p) =>
      p.question && p.answer && typeof p.question === 'string' && typeof p.answer === 'string',
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  let totalGenerated = 0;
  let totalSkipped = 0;
  let processed = 0;
  let quotaExceeded = false;

  console.log(`Daily limit: ${DRY_RUN ? 'unlimited (dry run)' : DAILY_LIMIT} articles\n`);

  for (const dir of contentDirs) {
    if (quotaExceeded || (!DRY_RUN && processed >= DAILY_LIMIT)) break;

    const dirName = dir.split(/[\\/]/).pop();
    let files: string[];
    try {
      files = readdirSync(dir).filter((f) => f.endsWith('.md'));
    } catch {
      console.log(`Skipping ${dirName} — directory not found`);
      continue;
    }

    for (const file of files) {
      if (quotaExceeded || (!DRY_RUN && processed >= DAILY_LIMIT)) break;

      const slug = file.replace(/\.md$/, '');
      if (slugArg && slug !== slugArg) continue;

      const filePath = join(dir, file);
      const raw = readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);

      if (Array.isArray(data.qaPairs) && data.qaPairs.length >= 3) {
        console.log(`  [skip] ${slug} — already has ${data.qaPairs.length} Q&A pairs`);
        totalSkipped++;
        continue;
      }

      const title = String(data.title || slug);
      const description = String(data.description || '');

      process.stdout.write(`  [gen] ${slug}... `);

      try {
        const qaPairs = await generateQA(title, description, content);
        console.log(`${qaPairs.length} pairs`);

        if (!DRY_RUN) {
          data.qaPairs = qaPairs;
          const updated = matter.stringify(raw.split('---').slice(2).join('---').trimStart(), data);
          writeFileSync(filePath, updated, 'utf8');
        }

        totalGenerated++;
        processed++;

        if (!DRY_RUN && processed >= DAILY_LIMIT) {
          console.log(`\nReached daily limit of ${DAILY_LIMIT}. Run again tomorrow to continue.`);
        }

        await sleep(1500);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.startsWith('QUOTA_EXCEEDED:')) {
          quotaExceeded = true;
          console.log(`\n429 quota exceeded (typically resets in ~24h).`);
          console.log(`Progress saved. Run this script again tomorrow to continue.`);
          console.log(`Tip: Enable billing at https://console.cloud.google.com/billing for higher limits.`);
        } else if (msg.startsWith('TRANSIENT:')) {
          // Retry once after 10s
          console.log(`transient error, retrying in 10s... `);
          await sleep(10000);
          try {
            const qaPairs = await generateQA(title, description, content);
            console.log(`${qaPairs.length} pairs (retry ok)`);
            if (!DRY_RUN) {
              data.qaPairs = qaPairs;
              const updated = matter.stringify(raw.split('---').slice(2).join('---').trimStart(), data);
              writeFileSync(filePath, updated, 'utf8');
            }
            totalGenerated++;
            processed++;
            await sleep(1500);
          } catch (retryErr) {
            console.error(`ERROR (retry): ${retryErr instanceof Error ? retryErr.message : retryErr}`);
          }
        } else {
          console.error(`ERROR: ${msg}`);
        }
      }
    }
  }

  console.log(`\nDone. Generated: ${totalGenerated}, Skipped: ${totalSkipped}`);
  if (DRY_RUN) console.log('(dry run — no files were modified)');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
