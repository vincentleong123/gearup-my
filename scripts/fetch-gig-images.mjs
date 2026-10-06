/**
 * Downloads the gig-section images (see gig-images-plan.mjs) from Pollinations
 * into public/blog/, cropping the pollinations.ai watermark off the bottom.
 *
 * - Deterministic watermark removal: the mark sits at the bottom-right of the
 *   response (measured y=551..565 of 576), so we always trim the bottom 8% of
 *   the height. No API flag removes it - nologo/private/referrer were all tested
 *   and the mark is still baked in.
 * - Idempotent: a finished file >30 KB is skipped, so re-running resumes.
 * - Quota aware: Pollinations answers HTTP 402/429 when the anonymous window is
 *   spent - back off and keep going.
 * - Verified: content-type + minimum size before writing, and the raw payload is
 *   probed for residual watermark pixels afterwards (warn only, so a white
 *   shirt can never fail a good image).
 * - Every finished file is also copied into .next/standalone/public/blog/ so the
 *   running production server serves it without waiting for a rebuild.
 *
 * Run: node scripts/fetch-gig-images.mjs [--force] [--only=<substr>] [--shard=i/n]
 */
import { existsSync, statSync, writeFileSync, appendFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { gigImages } from './gig-images-plan.mjs';

const PUBLIC_BLOG = join(process.cwd(), 'public', 'blog');
const STANDALONE_BLOG = join(process.cwd(), '.next', 'standalone', 'public', 'blog');
const LOG = join(process.cwd(), 'scripts', 'gig-images-fetch.log');
const FORCE = process.argv.includes('--force');
const onlyArg = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';
const shardArg = (process.argv.find((a) => a.startsWith('--shard=')) || '').split('=')[1];

let shardIdx = 0;
let shardCount = 1;
if (shardArg) {
  const [i, n] = shardArg.split('/').map(Number);
  shardIdx = i;
  shardCount = n;
}

const MIN_BYTES = 20 * 1024;
const MAX_ATTEMPTS = 10;
const REQUEST_DELAY_MS = 4000;
const CROP_FRAC = 0.08; // bottom 8% always trimmed (holds the watermark)
// SEED_EXTRA re-rolls a bad image without touching the plan:
//   SEED_EXTRA=1 node scripts/fetch-gig-images.mjs --force --only=<file>
const SEED_EXTRA = Number(process.env.SEED_EXTRA || 0);

mkdirSync(PUBLIC_BLOG, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (msg) => {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  appendFileSync(LOG, line + '\n');
};

const jobs = gigImages.filter((img, idx) => {
  if (idx % shardCount !== shardIdx) return false;
  if (onlyArg && !img.file.includes(onlyArg)) return false;
  return true;
});

log(`start: ${jobs.length} gig images planned (shard ${shardIdx}/${shardCount})`);

// Scans the bottom-right corner for the baked-in watermark pixels.
// Returns the highest white-row offset from the bottom, or 0.
async function watermarkTop(buf) {
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const x0 = Math.floor(width * 0.85);
  let top = height;
  for (let y = Math.floor(height * 0.88); y < height; y++) {
    for (let x = x0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (data[i] > 175 && data[i + 1] > 175 && data[i + 2] > 175) {
        if (y < top) top = y;
        break;
      }
    }
  }
  return top === height ? 0 : height - top;
}

let ok = 0;
let skipped = 0;
let failed = 0;

for (const job of jobs) {
  const dest = join(PUBLIC_BLOG, job.file);

  if (!FORCE && existsSync(dest) && statSync(dest).size > MIN_BYTES) {
    skipped += 1;
    log(`skip (exists): ${job.file}`);
    continue;
  }

  const url =
    'https://image.pollinations.ai/prompt/' +
    encodeURIComponent(job.prompt) +
    `?width=1600&height=900&nologo=true&seed=${job.seed + SEED_EXTRA}&model=flux`;

  let done = false;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS && !done; attempt++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(120000),
        headers: { 'User-Agent': 'Mozilla/5.0 (kameralog-image-build)' },
      });

      if (res.status === 402 || res.status === 429) {
        log(`quota ${res.status}: ${job.file} (attempt ${attempt}) - backing off 75s`);
        await sleep(75000);
        continue;
      }
      if (!res.ok) {
        log(`http ${res.status}: ${job.file} (attempt ${attempt})`);
        await sleep(20000);
        continue;
      }

      const ct = res.headers.get('content-type') || '';
      const raw = Buffer.from(await res.arrayBuffer());
      if (!ct.startsWith('image/') || raw.length < MIN_BYTES) {
        log(`bad payload (${ct}, ${raw.length}B): ${job.file} (attempt ${attempt})`);
        await sleep(20000);
        continue;
      }

      const meta = await sharp(raw).metadata();
      const h = meta.height;
      const w = meta.width;
      const cropPx = Math.max(1, Math.round(h * CROP_FRAC));
      const needPx = await watermarkTop(raw);

      const out = await sharp(raw)
        .extract({ left: 0, top: 0, width: w, height: h - cropPx })
        .sharpen({ sigma: 0.7 })
        .jpeg({ quality: 88, progressive: true, mozjpeg: true })
        .toBuffer();

      if (out.length < MIN_BYTES) {
        log(`post-process too small (${out.length}B): ${job.file} (attempt ${attempt})`);
        await sleep(20000);
        continue;
      }

      writeFileSync(dest, out);
      if (needPx > cropPx + 2) {
        log(`WARN watermark may exceed crop on ${job.file}: needs ${needPx}px, cropped ${cropPx}px`);
      }

      // Keep the running standalone server in sync without waiting for a rebuild.
      if (existsSync(STANDALONE_BLOG)) {
        try {
          copyFileSync(dest, join(STANDALONE_BLOG, job.file));
        } catch (err) {
          log(`standalone copy failed: ${job.file} ${err?.message || err}`);
        }
      }

      ok += 1;
      log(`saved: ${job.file} (${w}x${h} -> ${w}x${h - cropPx}, ${out.length}B)`);
      done = true;
    } catch (err) {
      log(`error: ${job.file} (attempt ${attempt}) ${err?.message || err}`);
      await sleep(25000);
    }
    await sleep(REQUEST_DELAY_MS);
  }

  if (!done) {
    failed += 1;
    log(`FAILED: ${job.file}`);
  }
}

log(`done: saved=${ok} skipped=${skipped} failed=${failed}`);
if (failed > 0) process.exitCode = 1;
