/**
 * Topic image generator for the featured article
 * (nikon-z5iic-canon-r8-mark-ii-buy-window-malaysia-2026).
 * Same pipeline as fetch-gig-images.mjs: Pollinations flux -> crop bottom 8%
 * (watermark strip) -> sharpen -> public/blog/ + .next/standalone/public/blog/.
 * Idempotent per file: skips images that exist (pass --force to re-roll all;
 * --only=<file> restricts to one; SEED_EXTRA=<n> varies every roll).
 *
 * PROMPT RULE (learned the hard way, keep it): put the PERSON HOLDING THE
 * CAMERA first, one subject, plain environment, at most one secondary prop.
 * Still-life / flat-lay / prop-heavy prompts reliably come back with NO
 * camera, fake text, or CG blobs.
 * Run: node scripts/gen-hero-image.mjs [--force] [--only=<file>]
 */
import { existsSync, mkdirSync, appendFileSync, copyFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const SEED_EXTRA = Number(process.env.SEED_EXTRA || 0);
const FORCE = process.argv.includes('--force');
const ONLY_ARG = process.argv.find((a) => a.startsWith('--only='));
const ONLY = ONLY_ARG ? ONLY_ARG.slice('--only='.length) : null;

// Same proven suffix as scripts/gig-images-plan.mjs (45/45 success).
const STYLE =
  ', one single Malaysian woman content creator, behind the scenes, ' +
  'documentary photojournalistic photograph, natural daylight, sharp focus, ' +
  'fine detail, realistic skin texture, 35mm lens, shallow depth of field, ' +
  'no text, no signage, no watermark, no logo, no crowd, ' +
  'no group of people, no car';

const IMAGES = [
  {
    file: 'nikon-z5iic-canon-r8-mark-ii-buy-window-malaysia-2026.jpg',
    prompt:
      'a young Malaysian woman photographer holding a compact black mirrorless camera ' +
      'with both hands and reviewing a photo on its rear screen, seated at a plain ' +
      'wooden table by a bright window, a second black camera body resting beside her elbow' +
      STYLE,
  },
  {
    file: 'nikon-z5iic-canon-r8-mark-ii-specs-compare.jpg',
    prompt:
      "extreme close-up of a woman's hands holding a black mirrorless camera body " +
      'with the lens removed, the image sensor clearly visible inside the lens mount, ' +
      'the detached lens held in her other hand beside it, bright window light from the ' +
      'left, plain light grey wall background, sharp focus on the sensor ring' +
      ', documentary photograph, natural daylight, sharp focus, fine detail, ' +
      '35mm lens, shallow depth of field, no text, no signage, no watermark, ' +
      'no logo, no crowd, no group of people',
  },
  {
    file: 'nikon-z5iic-canon-r8-mark-ii-used-buy.jpg',
    prompt:
      'a young Malaysian woman photographer sitting by a bright window holding a compact ' +
      'black mirrorless camera with a prime lens in both hands, looking down at the ' +
      'camera rear screen and reviewing a photo, side profile, warm morning light, ' +
      'plain neutral background' +
      STYLE,
  },
  {
    file: 'nikon-z5iic-canon-r8-mark-ii-1111-sale.jpg',
    prompt:
      'a young Malaysian woman photographer comparing camera prices on a laptop at a ' +
      'plain wooden desk at night, a black mirrorless camera with a lens standing on the ' +
      'desk next to the laptop, warm desk lamp glow, laptop screen glowing softly with ' +
      'a blurred abstract blue interface' +
      STYLE,
  },
  {
    file: 'nikon-z5iic-canon-r8-mark-ii-convocation-gig.jpg',
    prompt:
      'a young Malaysian woman photographer wearing a black graduation gown holding a ' +
      'compact black mirrorless camera with a prime lens, checking a photo on its rear ' +
      'screen after a convocation ceremony, empty campus corridor with warm evening light' +
      STYLE,
  },
];

const PUBLIC_BLOG = join(process.cwd(), 'public', 'blog');
const STANDALONE_BLOG = join(process.cwd(), '.next', 'standalone', 'public', 'blog');
const LOG = join(process.cwd(), 'scripts', 'hero-image-fetch.log');
mkdirSync(PUBLIC_BLOG, { recursive: true });
mkdirSync(STANDALONE_BLOG, { recursive: true });

const log = (msg) => {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  appendFileSync(LOG, line + '\n');
};

async function generateOne(image, index) {
  const dest = join(PUBLIC_BLOG, image.file);
  if (!FORCE && existsSync(dest)) {
    log(`skip (exists): ${image.file}`);
    return true;
  }
  const seed = 771211 + index * 137 + SEED_EXTRA;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(image.prompt)}`
    + `?width=1600&height=900&nologo=true&seed=${seed}&model=flux`;

  const MAX_ATTEMPTS = 8;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (kameralog-image-build)' } });
      if (res.status === 402 || res.status === 429) {
        log(`quota ${res.status}: ${image.file} (attempt ${attempt}) - backing off 75s`);
        await new Promise((r) => setTimeout(r, 75000));
        continue;
      }
      if (!res.ok) {
        log(`http ${res.status}: ${image.file} (attempt ${attempt})`);
        await new Promise((r) => setTimeout(r, 8000));
        continue;
      }
      const ct = res.headers.get('content-type') || '';
      if (!ct.startsWith('image/')) {
        log(`bad payload (${ct}): ${image.file}`);
        await new Promise((r) => setTimeout(r, 10000));
        continue;
      }
      const raw = Buffer.from(await res.arrayBuffer());
      if (raw.length < 20 * 1024) {
        log(`payload too small (${raw.length}B): ${image.file}`);
        await new Promise((r) => setTimeout(r, 10000));
        continue;
      }
      const img = sharp(raw);
      const meta = await img.metadata();
      const w = meta.width || 1024;
      const h = meta.height || 576;
      const cropPx = Math.round(h * 0.08);
      const keptH = h - cropPx;
      // Canonical featured aspect: exact 16:9 (crop sides, never upscale),
      // so files match every display box + og declarations without surprises.
      const keptW = Math.round(keptH * 16 / 9) <= w ? Math.round(keptH * 16 / 9) : w;
      const out = await img
        .extract({ left: 0, top: 0, width: w, height: keptH })
        .resize(keptW, keptH, { fit: 'cover', position: 'centre' })
        .sharpen({ sigma: 0.7 })
        .jpeg({ quality: 88, mozjpeg: true })
        .toBuffer();
      writeFileSync(dest, out);
      if (STANDALONE_BLOG) copyFileSync(dest, join(STANDALONE_BLOG, image.file));
      log(`saved: ${image.file} (${w}x${h} -> ${keptW}x${keptH}, ${out.length}B)`);
      return true;
    } catch (err) {
      log(`error: ${image.file} (attempt ${attempt}) ${err?.message || err}`);
      await new Promise((r) => setTimeout(r, 15000));
    }
  }
  log(`FAILED: ${image.file} after ${MAX_ATTEMPTS} attempts`);
  return false;
}

let ok = 0;
let failed = 0;
for (let i = 0; i < IMAGES.length; i++) {
  const image = IMAGES[i];
  if (ONLY && image.file !== ONLY) continue;
  const done = await generateOne(image, i);
  if (done) ok++;
  else failed++;
}
log(`done: ok=${ok} failed=${failed} force=${FORCE} seedExtra=${SEED_EXTRA}`);
if (failed > 0) process.exitCode = 1;
