import { readFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';

const BASE = process.env.BASE || 'http://localhost:3002';
const xml = (await (await fetch(`${BASE}/sitemap.xml`)).text()).match(/<loc>(.*?)<\/loc>/g)
  ?.map(m => m.replace(/<\/?loc>/g, '')) ?? [];
console.log('urls in sitemap:', xml.length);

const srcs = new Map(); // src -> pages[]
const PAGES = 999;
let fetched = 0;
const localBase = join(process.cwd(), 'public');

async function crawl(page) {
  try {
    const html = await (await fetch(page)).text();
    for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
      const src = m[1];
      const list = srcs.get(src) || [];
      list.push(page);
      srcs.set(src, list);
    }
    fetched++;
    if (fetched % 50 === 0) console.log('pages crawled:', fetched);
  } catch (e) {
    console.log('page fail:', page, String(e).slice(0, 80));
  }
}

const queue = [...xml];
for (let i = 0; i < queue.length; i += 16) {
  await Promise.all(queue.slice(i, i + 16).map(crawl));
}
console.log('pages crawled:', fetched, 'unique img srcs:', srcs.size);

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const bad = [];
const pending = [...srcs];
for (let i = 0; i < pending.length; i += 16) {
  await Promise.all(pending.slice(i, i + 16).map(async ([src]) => {
    let ok = true;
    if (src.startsWith('/')) {
      const file = join(localBase, src.split('?')[0]);
      ok = existsSync(file) && statSync(file).size > 512;
    } else if (src.startsWith('http')) {
      try {
        // GET + browser UA: Wikimedia 400s on HEAD/empty-UA, and both
        // Wikimedia & Instagram are UA-sensitive.
        const r = await fetch(src, { method: 'GET', headers: { 'User-Agent': UA } });
        r.body?.cancel();
        ok = r.ok;
      } catch { ok = false; }
    } else {
      ok = null; // data: or other inline - skip
    }
    if (ok === false) bad.push(src);
  }));
}

console.log('\nBAD IMG SRCs:', bad.length);
for (const b of bad) {
  console.log(b.slice(0, 120), ' <- pages:', srcs.get(b)?.slice(0, 3).join(', '));
}
