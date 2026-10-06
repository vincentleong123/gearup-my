/**
 * Downloads the batch-1 SEO in-article images (see seo-images-plan.mjs) from
 * Pollinations.ai into public/blog/.
 *
 * - Idempotent: existing files > 30 KB are skipped, so re-running resumes.
 * - Quota aware: Pollinations allows roughly 3-4 anonymous calls per ~5 min
 *   window, then answers HTTP 402 - we back off and keep going.
 * - Every download is verified (content-type + minimum size) before it is
 *   written, so a quota error page can never be saved as a .jpg.
 *
 * Run: node scripts/fetch-seo-images.mjs [--force]
 */
import { mkdirSync, existsSync, statSync, writeFileSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { batch1 } from './seo-images-plan.mjs';

const OUT_DIR = join(process.cwd(), 'public', 'blog');
const LOG = join(process.cwd(), 'scripts', 'seo-images-fetch.log');
const FORCE = process.argv.includes('--force');
// --only=<substring> restricts the run to matching filenames (used with
// --force to regenerate individual images without re-downloading the batch).
const onlyArg = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';
// SEED_EXTRA=n nudges the generator so a forced re-roll isn't the same image.
const SEED_EXTRA = Number(process.env.SEED_EXTRA || 0);
// --shard i/n lets several workers split the job list (each file is fetched
// by exactly one worker, so parallel workers never race on the same file).
const shardArg = (process.argv.find((a) => a.startsWith('--shard=')) || '').split('=')[1];
let shardIdx = 0;
let shardCount = 1;
if (shardArg) {
  const [i, n] = shardArg.split('/').map(Number);
  shardIdx = i;
  shardCount = n;
}

const MIN_BYTES = 15 * 1024;
const MAX_ATTEMPTS = 8;
const REQUEST_DELAY_MS = 3000;

mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (msg) => {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  appendFileSync(LOG, line + '\n');
};

const jobs = [];
batch1.forEach((a, ai) => {
  a.images.forEach((img, ii) => {
    const idx = ai * 10 + ii * 3;
    if (idx % shardCount !== shardIdx) return;
    if (onlyArg && !img.file.includes(onlyArg)) return;
    jobs.push({ slug: a.slug, ...img, seed: 1000 + idx + (onlyArg ? 977 : 0) + SEED_EXTRA });
  });
});

log(`start: ${jobs.length} images planned (shard ${shardIdx}/${shardCount}), out dir ${OUT_DIR}`);

let ok = 0;
let skipped = 0;
let failed = 0;

for (const job of jobs) {
  const dest = join(OUT_DIR, job.file);

  if (!FORCE && existsSync(dest) && statSync(dest).size > MIN_BYTES) {
    skipped += 1;
    log(`skip (exists): ${job.file}`);
    continue;
  }

  const url =
    'https://image.pollinations.ai/prompt/' +
    encodeURIComponent(job.prompt) +
    `?width=1600&height=900&nologo=true&seed=${job.seed}&model=flux`;

  let done = false;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS && !done; attempt++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(120000),
        headers: { 'User-Agent': 'Mozilla/5.0 (kameralog-image-build)' },
      });

      if (res.status === 402 || res.status === 429) {
        log(`quota ${res.status}: ${job.file} (attempt ${attempt}) - backing off 60s`);
        await sleep(60000);
        continue;
      }
      if (!res.ok) {
        log(`http ${res.status}: ${job.file} (attempt ${attempt})`);
        await sleep(15000);
        continue;
      }

      const ct = res.headers.get('content-type') || '';
      const buf = Buffer.from(await res.arrayBuffer());
      if (!ct.startsWith('image/') || buf.length < MIN_BYTES) {
        log(`bad payload (${ct}, ${buf.length}B): ${job.file} (attempt ${attempt})`);
        await sleep(15000);
        continue;
      }

      writeFileSync(dest, buf);
      ok += 1;
      log(`saved: ${job.file} (${buf.length}B)`);
      done = true;
    } catch (err) {
      log(`error: ${job.file} (attempt ${attempt}) ${err?.message || err}`);
      await sleep(20000);
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
