/**
 * Verifies batch-1 SEO image work against the BUILT html
 * (.next/server/app/**) plus the public image files.
 *
 * Checks per article:
 *   - both new /blog/*.jpg <img> tags present with non-empty, <=125 char alt
 *   - <figcaption> visible caption present
 *   - Article JSON-LD image array = cover + 2 inline images
 *   - alt coverage across every <img> on the page (no empty alts)
 *   - SEO surface: <title> / meta description length, canonical, og:image
 *
 * Run after `npm run build`: node scripts/verify-seo-images.mjs
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { batch1 } from './seo-images-plan.mjs';

const APP = join(process.cwd(), '.next', 'server', 'app');
const BLOG = join(process.cwd(), 'public', 'blog');

const htmlFor = (slug, lang) => {
  const rel = lang === 'ms' ? ['ms', 'blog'] : ['blog'];
  const base = join(APP, ...rel, slug);
  for (const cand of [`${base}.html`, join(base, 'index.html')]) {
    if (existsSync(cand)) return readFileSync(cand, 'utf8');
  }
  return null;
};

const rows = [];
let failures = 0;

for (const article of batch1) {
  const html = htmlFor(article.slug, article.lang);
  const row = { slug: article.slug, lang: article.lang, problems: [] };

  if (!html) {
    row.problems.push('built HTML not found');
    failures += 1;
    rows.push(row);
    continue;
  }

  for (const img of article.images) {
    const file = `/blog/${img.file}`;
    if (!html.includes(`src="${file}"`)) row.problems.push(`missing img ${file}`);
    if (!html.includes(`alt="${img.alt}"`)) row.problems.push(`missing/wrong alt for ${img.file}`);
    if (img.alt.length > 125) row.problems.push(`alt too long (${img.alt.length}) ${img.file}`);
    if (!html.includes(img.caption)) row.problems.push(`missing figcaption for ${img.file}`);

    const path = join(BLOG, img.file);
    if (!existsSync(path)) row.problems.push(`file missing on disk: ${img.file}`);
    else if (statSync(path).size < 15 * 1024) row.problems.push(`file too small: ${img.file}`);
  }

  // Article JSON-LD image array
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  let imageLd = null;
  for (const b of ldBlocks) {
    try {
      const j = JSON.parse(b);
      if (j['@type'] === 'Article') imageLd = j.image;
    } catch {
      /* ignore */
    }
  }
  if (!Array.isArray(imageLd)) row.problems.push('Article JSON-LD image is not an array');
  else {
    row.ldImages = imageLd.length;
    if (imageLd.length !== 3) row.problems.push(`Article JSON-LD image count = ${imageLd.length} (expected 3)`);
    for (const img of article.images) {
      if (!imageLd.some((u) => String(u).endsWith(img.file))) row.problems.push(`JSON-LD missing ${img.file}`);
    }
  }

  // alt coverage: every <img> must carry a non-empty alt
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  row.imgCount = imgs.length;
  const noAlt = imgs.filter((t) => !/\salt="[^"]+"/.test(t)).length;
  if (noAlt > 0) row.problems.push(`${noAlt}/${imgs.length} <img> without alt`);

  // SEO surface measurements
  const title = (html.match(/<title>(.*?)<\/title>/s) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const ogImage = (html.match(/property="og:image" content="([^"]*)"/) || [])[1] || '';
  row.title = title.replace(/\s+/g, ' ').trim();
  row.titleLen = row.title.length;
  row.descLen = desc.length;
  row.canonical = canonical;
  row.ogImage = ogImage ? ogImage.replace('https://kameralog.com', '') : '';
  if (row.titleLen < 30 || row.titleLen > 70) row.problems.push(`title length ${row.titleLen}`);
  if (row.descLen < 70 || row.descLen > 165) row.problems.push(`description length ${row.descLen}`);
  if (!canonical) row.problems.push('no canonical');
  if (!ogImage) row.problems.push('no og:image');

  failures += row.problems.length;
  rows.push(row);
}

for (const r of rows) {
  const mark = r.problems.length ? 'FAIL' : ' OK ';
  console.log(
    `${mark} ${r.slug.padEnd(40)} imgs=${r.imgCount ?? '-'} ld=${r.ldImages ?? '-'} title=${r.titleLen ?? '-'} desc=${r.descLen ?? '-'}`,
  );
  r.problems.forEach((p) => console.log(`      - ${p}`));
}

console.log(`\nproblems: ${failures}`);

const { writeFileSync } = await import('node:fs');
writeFileSync(join(process.cwd(), 'scripts', 'seo-images-verify.json'), JSON.stringify(rows, null, 2), 'utf8');
if (failures > 0) process.exitCode = 1;
