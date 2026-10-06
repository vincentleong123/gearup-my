/**
 * Canonical aspect management for featured/hero images (public/blog).
 *
 * Why: 137 article frontmatter `image:` values point into /blog, but the pool
 * mixes 16:9, 3:4, square and 1:1.8+ portrait files. On-page every slot uses
 * object-cover (safe), but share cards declare og:image width/height and
 * portraits/squares get letterboxed or distorted downstream. Policy:
 *
 *   - every .jpg in public/blog is cropped/resized to EXACT 16:9,
 *     fit=cover with attention gravity (subject-aware), capped at 1600x900,
 *     never upscaled, re-encoded q88 mozjpeg.
 *   - writes src/data/generated/image-dims.ts (path -> [w,h]) consumed by
 *     src/lib/og.ts so og:image dimensions are always truthful.
 *   - changed jpgs are copied into .next/standalone/public/blog if present.
 *
 * Idempotent: conforming files are only read for dims (no re-encode).
 * Root cause lesson: pass file bytes to sharp via readFileSync -> sharp(buf).
 * sharp keeps its input handle on the pipeline object until GC, which on
 * Windows blocks our own writeFileSync of the same path with
 * "UNKNOWN: unknown error, open" for the rest of the process lifetime.
 * Residual OS locks (AV) are retried in further rounds.
 * Run: node scripts/normalize-image-aspects.mjs [--quiet]
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, existsSync, appendFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const QUIET = process.argv.includes('--quiet');
const PUBLIC_BLOG = join(process.cwd(), 'public', 'blog');
const STANDALONE_BLOG = join(process.cwd(), '.next', 'standalone', 'public', 'blog');
const DIMS_OUT = join(process.cwd(), 'src', 'data', 'generated', 'image-dims.ts');
const LOG = join(process.cwd(), 'scripts', 'normalize-image-aspects.log');
const TARGET = 16 / 9;
const TOL = 0.01;
const MAX_W = 1600;
const MAX_ROUNDS = 6;
const ROUND_GAP_MS = 5000;

const log = (msg) => {
  if (!QUIET) {
    appendFileSync(LOG, `[${new Date().toISOString()}] ${msg}\n`);
    console.log(msg);
  }
};

const files = readdirSync(PUBLIC_BLOG).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const dims = {};
let reencoded = 0;
let skipped = 0;

async function processFile(f) {
  const src = join(PUBLIC_BLOG, f);
  const rel = `/blog/${f}`;
  // Read via fs into a buffer FIRST: sharp keeps its own input file handle on
  // the pipeline object until GC, which on Windows then blocks our
  // writeFileSync of the same path with "UNKNOWN: unknown error, open".
  const input = readFileSync(src);
  let meta;
  try { meta = await sharp(input).metadata(); }
  catch (e) { log(`PHASE metadata: ${f}: ${e?.message || e}`); throw e; }
  const w = meta.width || 0;
  const h = meta.height || 0;
  if (!w || !h) { log(`!! no dims: ${f}`); dims[rel] = [0, 0]; skipped++; return; }

  const isJpg = /jpe?g$/i.test(extname(f));
  const aspect = w / h;
  const conforms = Math.abs(aspect - TARGET) <= TOL && w <= MAX_W;

  if (!isJpg) {
    dims[rel] = [w, h];
    if (!conforms) log(`note (non-jpg, left as-is): ${f} ${w}x${h}`);
    skipped++;
    return;
  }

  if (conforms) {
    dims[rel] = [w, h];
    skipped++;
    return;
  }

  // Largest exact-16:9 box inside the source, then cap width.
  let outW, outH;
  if (aspect > TARGET) { outH = h; outW = Math.round(h * TARGET); }
  else { outW = w; outH = Math.round(w / TARGET); }
  if (outW > MAX_W) { outW = MAX_W; outH = Math.round(MAX_W / TARGET); }

  let buf;
  try {
    buf = await sharp(input)
      .resize(outW, outH, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
  } catch (e) { log(`PHASE resize: ${f}: ${e?.message || e}`); throw e; }
  // Safety net: if anything (AV) briefly locks the path, retry the write.
  let lastErr;
  for (let i = 0; i < 8; i++) {
    try {
      writeFileSync(src, buf);
      if (existsSync(STANDALONE_BLOG)) copyFileSync(src, join(STANDALONE_BLOG, f));
      lastErr = null;
      break;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 250));
    }
  }
  if (lastErr) throw lastErr;
  dims[rel] = [outW, outH];
  reencoded++;
  log(`normalized: ${f} ${w}x${h} -> ${outW}x${outH}`);
}

let pending = files;
for (let round = 1; round <= MAX_ROUNDS && pending.length > 0; round++) {
  const failed = [];
  for (const f of pending) {
    try { await processFile(f); }
    catch (err) { failed.push(f); if (round === MAX_ROUNDS) log(`!! ${f}: ${err?.message || err} ||| STACK: ${String(err?.stack).split('\n').slice(0, 4).join(' // ')}`); }
  }
  pending = failed;
  if (pending.length > 0) {
    log(`round ${round}: ${pending.length} file(s) locked by system - retrying in ${ROUND_GAP_MS / 1000}s`);
    await new Promise((r) => setTimeout(r, ROUND_GAP_MS));
  }
}

mkdirSync(join(process.cwd(), 'src', 'data', 'generated'), { recursive: true });
const body = Object.keys(dims)
  .sort()
  .map((k) => `  '${k}': [${dims[k][0]}, ${dims[k][1]}],`)
  .join('\n');
writeFileSync(
  DIMS_OUT,
  `// AUTO-GENERATED by scripts/normalize-image-aspects.mjs - do not edit.\n`
  + `// Truthful pixel dimensions of every public/blog asset (og:image metadata).\n`
  + `export const IMAGE_DIMS: Record<string, [number, number]> = {\n${body}\n};\n`,
);
const msg = `done: ${files.length} files, re-encoded ${reencoded}, unchanged ${skipped}`
  + (pending.length ? `, GAVE UP on ${pending.length} (locked): ${pending.join(', ')}` : ', all processed');
log(msg);
if (pending.length > 0) process.exitCode = 1;
