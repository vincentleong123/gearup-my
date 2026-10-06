// Detect whether resize-seo-images.py DISTORTED files: re-fetch the original
// from Pollinations (same URL = service cache), then compare
//   fill-stretch(orig -> 1600x900)  vs  cover-crop(orig -> 1600x900)
// against the current file. Whichever matches proves how current was made.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { batch1 } from './seo-images-plan.mjs';
import sharp from 'sharp';

const TMP = join(process.env.TEMP, 'orig-recache');
mkdirSync(TMP, { recursive: true });

const jobs = [];
batch1.forEach((a, ai) => {
  a.images.forEach((img, ii) => {
    const idx = ai * 10 + ii * 3;
    jobs.push({ file: img.file, prompt: img.prompt, seed: 1000 + idx });
  });
});

// Sample: first, middle-ish, last
const picks = [jobs[0], jobs[13], jobs[27], jobs[jobs.length - 1]].filter(Boolean);

const urlFor = (j) =>
  'https://image.pollinations.ai/prompt/' +
  encodeURIComponent(j.prompt) +
  `?width=1600&height=900&nologo=true&seed=${j.seed}&model=flux`;

async function diffPng(a, b) {
  const A = await sharp(a).resize(96, 54, { fit: 'fill' }).raw().toBuffer();
  const B = await sharp(b).resize(96, 54, { fit: 'fill' }).raw().toBuffer();
  let t = 0;
  for (let i = 0; i < A.length; i++) t += Math.abs(A[i] - B[i]);
  return t / A.length;
}

for (const j of picks) {
  const dest = join(TMP, 'orig-' + j.file);
  let fetched = existsSync(dest);
  if (!fetched) {
    const url = urlFor(j);
    let attempts = 0;
    while (attempts < 4) {
      attempts++;
      try {
        const res = await fetch(url, {
          signal: AbortSignal.timeout(120000),
          headers: { 'User-Agent': 'Mozilla/5.0 (kameralog-image-build)' },
        });
        if (res.status === 402 || res.status === 429) {
          console.log(`${j.file}: quota ${res.status}, waiting 60s`);
          await new Promise((r) => setTimeout(r, 60000));
          continue;
        }
        const buf = Buffer.from(await res.arrayBuffer());
        const ct = res.headers.get('content-type') || '';
        if (!ct.startsWith('image/') || buf.length < 15000) {
          console.log(`${j.file}: bad payload ${ct} ${buf.length}B, wait 15s`);
          await new Promise((r) => setTimeout(r, 15000));
          continue;
        }
        writeFileSync(dest, buf);
        fetched = true;
        break;
      } catch (e) {
        console.log(`${j.file}: err ${e?.message || e}, wait 20s`);
        await new Promise((r) => setTimeout(r, 20000));
      }
    }
  }
  if (!fetched) { console.log(`${j.file}: FETCH FAILED`); continue; }

  const cur = join(process.cwd(), 'public', 'blog', j.file);
  const om = await sharp(dest).metadata();
  const cm = await sharp(cur).metadata();
  const oa = om.width / om.height;
  const origIs169 = Math.abs(oa - 16 / 9) < 0.02;

  let fillD = 999, cropD = 999;
  if (!origIs169) {
    const fill = await sharp(dest).resize(1600, 900, { fit: 'fill' }).toBuffer();
    const crop = await sharp(dest).resize(1600, 900, { fit: 'cover', position: 'attention' }).toBuffer();
    fillD = await diffPng(fill, cur);
    cropD = await diffPng(crop, cur);
  } else {
    const up = await sharp(dest).resize(1600, 900, { fit: 'fill' }).toBuffer();
    fillD = await diffPng(up, cur);
    cropD = fillD;
  }
  const verdict = origIs169
    ? (fillD < 8 ? 'OK (orig 16:9, proportional upscale)' : 'CHECK (orig 16:9 but content differs - service re-generated?)')
    : fillD < cropD
      ? `DISTORTED (stretched from ${om.width}x${om.height}; fill-diff=${fillD.toFixed(1)} vs crop-diff=${cropD.toFixed(1)})`
      : `OK (cropped, not stretched; fill-diff=${fillD.toFixed(1)} vs crop-diff=${cropD.toFixed(1)})`;
  console.log(`${j.file}: orig=${om.width}x${om.height} cur=${cm.width}x${cm.height} -> ${verdict}`);
  await new Promise((r) => setTimeout(r, 3000));
}
console.log('done');
