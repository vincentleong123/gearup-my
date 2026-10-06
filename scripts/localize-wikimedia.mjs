/**
 * Localizes every upload.wikimedia.org URL referenced in src/data/images.ts:
 *   1. matches `'slug': 'https://upload.wikimedia.org/...thumb...'` pairs
 *   2. finds a working thumb size for each (browser UA, sequential to dodge 429s)
 *   3. downloads to public/wikimedia/<slug>.<ext>
 *   4. rewrites images.ts to '/wikimedia/<slug>.<ext>' so the site stops
 *      hotlinking Wikimedia (429 storms / future deletions)
 *
 * Attribution stays intact in gearPhotoCredits — only src URLs change.
 *
 * Run: node scripts/localize-wikimedia.mjs [--force]
 */
import { existsSync, statSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const FORCE = process.argv.includes('--force');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const OUT_DIR = join(process.cwd(), 'public', 'wikimedia');
mkdirSync(OUT_DIR, { recursive: true });

const text = readFileSync('src/data/images.ts', 'utf8');

// Only lines that map a slug to a wikimedia URL inside the images object
const pairs = {};
const re = /'([a-z0-9-]+)':\s*'(https:\/\/upload\.wikimedia\.org\/[^\s']+)'/g;
let m;
while ((m = re.exec(text))) pairs[m[1]] = m[2];

const slugs = Object.keys(pairs);
console.log('wikimedia entries:', slugs.length);

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function tryUrl(u) {
  try {
    const res = await fetch(u, { method: 'GET', headers: { 'User-Agent': UA } });
    if (res.status === 200) {
      const buf = Buffer.from(await res.arrayBuffer());
      return { status: 200, buf };
    }
    res.body?.cancel(); // drain non-200 (429/400) without storing
    return { status: res.status, buf: null };
  } catch {
    return { status: 0, buf: null };
  }
}

function sizeVariants(u) {
  // thumb size tokens: "960px-FILE.jpg" / "lossy-page1-960px-FILE.tiff.jpg" /
  // "1200px-FILE.png" (webp served as png). Try smaller thumbs in order.
  const uniq = [...new Set(['1200px', '960px', '800px', '640px', '480px'])];
  const current = u.match(/(\d{3,4})px/)?.[1];
  const candidates = [];
  for (const size of uniq) {
    if (size === current) { candidates.unshift(u); continue; }
    candidates.push(u.replace(/\d{3,4}px/g, size));
  }
  return [...new Set(candidates)];
}

const results = [];
for (const slug of slugs) {
  const url = pairs[slug];
  const dest = join(OUT_DIR, `${slug}.jpg`);
  if (!FORCE && existsSync(dest) && statSync(dest).size > 512) {
    console.log(`have: ${slug}`);
    results.push({ slug, ok: true });
    continue;
  }
  let done = false;
  for (const cand of sizeVariants(url)) {
    for (let attempt = 0; attempt < 2 && !done; attempt++) {
      if (attempt > 0) await sleep(20000); // 429 window
      const { status, buf } = await tryUrl(cand);
      if (status === 200 && buf && buf.length > 1024) {
        writeFileSync(dest, buf);
        results.push({ slug, ok: true });
        console.log(`saved: ${slug} (${(buf.length / 1024) | 0}KB)`);
        done = true;
        break;
      } else if (status === 429) {
        console.log(`429 on ${slug} (attempt ${attempt + 1})`);
      } else if (status !== 200) {
        break; // 400/404 -> try next size, don't hammer retries
      }
      await sleep(4000);
    }
    if (done) break;
    await sleep(4500);
  }
  if (!done) {
    console.log(`FAILED: ${slug}`);
    results.push({ slug, ok: false });
  }
}

// Rewrite images.ts: any wikimedia URL whose slug got a local file -> /wikimedia/<slug>.jpg
let outText = text;
let replaced = 0;
for (const r of results) {
  if (!r.ok) continue;
  const url = pairs[r.slug];
  if (!url) continue;
  if (outText.includes(url)) {
    outText = outText.split(url).join(`/wikimedia/${r.slug}.jpg`);
    replaced++;
  }
}
writeFileSync('src/data/images.ts', outText);
console.log(`rewritten entries: ${replaced}`);
const failed = results.filter(r => !r.ok);
console.log(failed.length ? `WARN unlocalized (left intact): ${failed.map(f => f.slug).join(', ')}` : 'ALL localized.');
