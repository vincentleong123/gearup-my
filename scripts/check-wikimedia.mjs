import { readFileSync } from 'fs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const text = readFileSync('src/data/images.ts', 'utf8');
const urls = [...new Set([...text.matchAll(/https:\/\/upload\.wikimedia\.org\/[^\s'"]+/g)].map(m => m[0]))];
console.log('wikimedia urls:', urls.length);

const out = await Promise.all(urls.map(async u => {
  try {
    const r = await fetch(decodeURIComponent(u).replace(/ /g, '_'), { method: 'GET', headers: { 'User-Agent': UA } });
    r.body?.cancel();
    return { u, s: r.status, ct: r.headers.get('content-type') };
  } catch (e) {
    return { u, s: 0, ct: String(e).slice(0, 40) };
  }
}));

for (const { u, s } of out) {
  if (s !== 200) console.log(`${s} ${u.slice(0, 110)}`);
}
console.log('total non-200:', out.filter(o => o.s !== 200).length, 'of', urls.length);
