/**
 * Inserts the planned in-article images (see seo-images-plan.mjs) into
 * content/articles/<slug>.md as markdown image lines with alt + caption:
 *
 *   ## Heading
 *   ![keyword rich alt text](/blog/file.jpg "visible caption")
 *
 * Idempotent: an article that already references a file is left alone.
 * Run: node scripts/apply-seo-images.mjs
 */
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { batch1 } from './seo-images-plan.mjs';

const ART_DIR = join(process.cwd(), 'content', 'articles');
const BLOG_DIR = join(process.cwd(), 'public', 'blog');

const results = [];
let insertedTotal = 0;
let updatedTotal = 0;
let problems = [];

for (const article of batch1) {
  const file = join(ART_DIR, `${article.slug}.md`);
  if (!existsSync(file)) {
    problems.push(`${article.slug}: markdown file missing`);
    continue;
  }

  const raw = readFileSync(file, 'utf8');
  const lines = raw.split('\n');

  // body starts after the frontmatter fence
  let bodyStart = 0;
  if (lines[0] === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        bodyStart = i + 1;
        break;
      }
    }
  }

  const h2 = [];
  for (let i = bodyStart; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) h2.push(i);
  }

  const done = [];
  const pending = [];
  const updates = [];

  for (const img of article.images) {
    const md = `![${img.alt}](${join('/', 'blog', img.file).replace(/\\/g, '/')} "${img.caption}")`;
    const existing = lines.findIndex((l) => l.includes(`(${join('/', 'blog', img.file).replace(/\\/g, '/')}`) || l.includes(`/blog/${img.file}`));

    if (existing >= 0) {
      if (lines[existing] !== md) updates.push({ md, line: existing, file: img.file });
      done.push(img.file);
      continue;
    }
    if (img.afterH2 > h2.length) {
      problems.push(`${article.slug}: only ${h2.length} H2s, cannot anchor image after H2 #${img.afterH2}`);
      continue;
    }
    const imgPath = join(BLOG_DIR, img.file);
    if (!existsSync(imgPath) || statSync(imgPath).size < 15 * 1024) {
      problems.push(`${article.slug}: ${img.file} not downloaded yet (skipping insert)`);
      continue;
    }
    pending.push({ md, line: h2[img.afterH2 - 1], file: img.file });
  }

  // apply bottom-up so earlier line numbers stay valid (inserts + alt/caption fixes)
  const all = [...pending, ...updates].sort((a, b) => b.line - a.line);
  for (const { md, line, file: f } of all) {
    const wasUpdate = updates.some((u) => u.file === f);
    if (wasUpdate) {
      lines[line] = md;
      updatedTotal += 1;
    } else {
      lines.splice(line + 1, 0, md);
      insertedTotal += 1;
    }
    done.push(f);
  }

  if (all.length > 0) writeFileSync(file, lines.join('\n'), 'utf8');

  results.push({
    slug: article.slug,
    lang: article.lang,
    h2Count: h2.length,
    images: done,
  });

  console.log(
    `${article.slug}: inserted ${pending.length}, updated ${updates.length}, already present ${done.length - pending.length - updates.length}, H2s=${h2.length}`,
  );
}

console.log(`\ntotal inserted: ${insertedTotal}, total alt/caption updated: ${updatedTotal}`);
if (problems.length) {
  console.log('\nPROBLEMS:');
  problems.forEach((p) => console.log(' - ' + p));
  process.exitCode = 1;
}

writeFileSync(
  join(process.cwd(), 'scripts', 'seo-images-batch1-result.json'),
  JSON.stringify({ insertedTotal, updatedTotal, problems, results }, null, 2),
  'utf8',
);
