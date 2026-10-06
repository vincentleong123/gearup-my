// Post-build sanity: light markers present, dark markers absent, census leftovers.
import fs from 'node:fs';
import path from 'node:path';

// ---- rendered checks
const html = await (await fetch('http://localhost:3002/en/gigs')).text();
console.log('rendered nav light:', html.includes('bg-[#faf9f7]/95'));
console.log('rendered footer light:', html.includes('border-t border-zinc-200 bg-white'));
console.log('rendered body light:', html.includes('bg-[#faf9f7] text-zinc-900'));
console.log('rendered old dark body:', html.includes('bg-[#09090b]'));
console.log('rendered theme-color #faf9f7:', html.includes('theme-color" content="#faf9f7"'));

// ---- source leftovers
const skip = new Set(['Nav.tsx', 'Footer.tsx', 'ScrollGuide.tsx', 'AdSlot.tsx', 'BackToTop.tsx']);
const pats = [
  [/text-zinc-(?:50|100|200|300)(?![-\d])/, 'light-text'],
  [/border-zinc-(?:700|800|900)(?![-\d])/, 'dark-border'],
  [/(?:^|[^-])bg-zinc-800(?!\/)/, 'bg800'],
];
const hits = { 'light-text': [], 'dark-border': [], bg800: [] };
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name === 'admin' || e.name === 'home2') continue;
      walk(p);
      continue;
    }
    if (!/\.tsx?$/.test(e.name)) continue;
    if (p === 'src\\app\\[lang]\\page.tsx') continue;
    if (skip.has(e.name)) continue;
    fs.readFileSync(p, 'utf8').split('\n').forEach((l, i) => {
      for (const [re, key] of pats) if (re.test(l)) hits[key].push(`${p.replace(/\\/g, '/')}:${i + 1}  ${l.trim().slice(0, 120)}`);
    });
  }
}
walk('src');
for (const k in hits) {
  console.log(`\n${k}: ${hits[k].length}`);
  for (const h of hits[k]) console.log('  ' + h);
}
