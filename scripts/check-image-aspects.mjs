/**
 * QA gate: aspect-ratio discipline for featured images.
 * Fails (exit 1) when:
 *   1. a jpg in public/blog deviates from exact 16:9 by >1% or is wider
 *      than 1600px (run `node scripts/normalize-image-aspects.mjs` to fix);
 *   2. a <img> tag in src/**\/*.tsx lacks object-cover / object-contain
 *      (the only way images can look stretched on-page is a fixed box
 *      without object-fit - preview-hero is a dev tool and is exempt).
 * Run: node scripts/check-image-aspects.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const TARGET = 16 / 9;
const TOL = 0.011;
const problems = [];

// ---- 1. file aspects ----
const blogDir = join(process.cwd(), 'public', 'blog');
for (const f of readdirSync(blogDir).sort()) {
  if (!/\.jpe?g$/i.test(f)) continue;
  const m = await sharp(join(blogDir, f)).metadata();
  const w = m.width || 0;
  const h = m.height || 0;
  if (!w || !h) { problems.push(`no dims: ${f}`); continue; }
  if (Math.abs(w / h - TARGET) > TOL) problems.push(`off-aspect ${f}: ${w}x${h} (${(w / h).toFixed(2)} != 1.78)`);
  else if (w > 1600) problems.push(`too wide ${f}: ${w}px > 1600`);
}

// ---- 2. <img> tags without object-fit ----
function walk(d, out = []) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.tsx')) out.push(p);
  }
  return out;
}
for (const f of walk(join(process.cwd(), 'src'))) {
  if (f.includes('preview-hero')) continue; // dev tool: shows natural aspect on purpose
  const c = readFileSync(f, 'utf8');
  const re = /<img\b[\s\S]{0,3000}?\/>/g;
  let m;
  while ((m = re.exec(c))) {
    const tag = m[0].replace(/\s+/g, ' ');
    if (!/object-(cover|contain)/.test(tag)) {
      const line = c.slice(0, m.index).split('\n').length;
      problems.push(`${f.replace(process.cwd() + '/', '')}:${line} <img> without object-cover/contain`);
    }
  }
}

if (problems.length) {
  console.error(`ASPECT CHECK FAILED (${problems.length}):`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log('aspect check: OK (all /blog jpgs exact 16:9 <=1600w; all <img> use object-fit)');
