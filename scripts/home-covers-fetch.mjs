// Home-refresh covers: hero (overwrite canonical) + 3 top-ROI gear covers that
// had no local file. Pollinations flux @1600x900 (exact 16:9 - no crop needed),
// idempotent, quota-aware (402/429 -> backoff), payload-verified.
import { existsSync, statSync, writeFileSync, appendFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = join(process.cwd(), 'public', 'blog');
const LOG = join(process.cwd(), 'scripts', 'home-covers-fetch.log');
const MIN_BYTES = 20000;
const MAX_ATTEMPTS = 6;
const FORCE = process.argv.includes('--force');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').replace('--only=', '');

const STYLE = 'photorealistic editorial photography, shallow depth of field, 50mm lens, natural light, one person or one hand only, no groups of people, no text, no signage, no watermark, no logo, no captions';

const PLAN = [
  {
    file: 'nikon-z5iic-canon-r8-mark-ii-buy-window-malaysia-2026.jpg',
    seed: 4401,
    prompt: `young Malaysian female content creator holding a full-frame mirrorless camera body with a large zoom lens, deciding between two locked camera bodies on a wooden desk at home, bright apartment window with soft morning light, shopping-decision mood, ${STYLE}`,
  },
  {
    file: 'dji-mic-2-review-malaysia.jpg',
    seed: 4402,
    prompt: `close-up of one hand holding a compact black wireless clip-on microphone transmitter over a cotton shirt collar, clean cream desk surface, soft studio light, product hero shot, ${STYLE}`,
  },
  {
    file: 'sony-zv-e10-ii-review-malaysia.jpg',
    seed: 4403,
    prompt: `young Malaysian girl holding a small silver vlogging camera with a flip-out screen facing herself, framing a selfie video, plain warm bedroom wall behind, ${STYLE}`,
  },
  {
    file: 'dji-osmo-pocket-3-review-malaysia.jpg',
    seed: 4404,
    prompt: `single hand holding a small palm gimbal camera with a bright touchscreen, city street at dusk with warm bokeh lights behind, pocket-creator mood, ${STYLE}`,
  },
];

mkdirSync(OUT_DIR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (msg) => {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  appendFileSync(LOG, line + '\n');
};

let ok = 0, skipped = 0, failed = 0;
for (const job of PLAN) {
  if (ONLY && !job.file.includes(ONLY)) continue;
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
        log(`quota ${res.status}: ${job.file} (attempt ${attempt}) - backing off 75s`);
        await sleep(75000);
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
    await sleep(5000);
  }
  if (!done) {
    failed += 1;
    log(`FAILED: ${job.file}`);
  }
}
log(`done: saved=${ok} skipped=${skipped} failed=${failed}`);
if (failed > 0) process.exitCode = 1;
