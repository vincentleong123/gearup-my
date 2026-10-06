// List newest articles (home-page slots) with image fields + local cover dims.
import fs from 'node:fs';
import sharp from 'sharp';

const { generatedArticles: entries } = await import('../src/data/generated/articles.ts');

const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const parseDate = (d) => {
  const m = /(\w+) (\d+), (\d+)/.exec(String(d));
  return m ? new Date(+m[3], months[m[1]], +m[2]) : new Date(d);
};
const sorted = [...entries].sort((a, b) => parseDate(b.date) - parseDate(a.date));

const home = sorted.slice(0, 8);
console.log('home slots (sorted[0..7]):');
for (const e of home) console.log(' ', e.slug, '|', e.date, '| cat=' + e.category, '| img=' + (e.image || '(none → blogImg fallback)'));

for (const e of home) {
  const f = 'public/blog/' + e.slug + '.jpg';
  try {
    const meta = await sharp(f).metadata();
    console.log(f, meta.width + 'x' + meta.height, ((meta.width / meta.height).toFixed(3)));
  } catch { console.log(f, 'MISSING'); }
}
