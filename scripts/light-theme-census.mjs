// One-shot census of dark-theme class tokens across themeable source files.
import fs from 'node:fs';
import path from 'node:path';

const skipFiles = new Set(['Nav.tsx', 'Footer.tsx', 'ScrollGuide.tsx', 'AdSlot.tsx', 'BackToTop.tsx']);
const counts = {};
let files = 0;

const pats = [
  'bg-zinc-950(?!/)',
  'bg-zinc-900(?!/)',
  'bg-zinc-800(?!/)',
  'bg-\\[#09090b\\]',
  'bg-\\[#101013\\]',
  'bg-\\[#16161a\\]',
  'bg-black(?![-/])',
  'text-white',
  'text-zinc-(?:50|100|200|300)(?!-)',
  'text-\\[#fafafa\\]',
  'hover:bg-zinc-900',
  'border-zinc-(?:700|800|900)(?!-)',
  'border-white\\/',
  'bg-white\\/',
];

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name === 'admin' || e.name === 'home2') continue;
      walk(p);
      continue;
    }
    if (!/\.tsx?$/.test(e.name)) continue;
    if (d === 'src\\app' && e.name === 'page.tsx') continue; // home reference
    if (skipFiles.has(e.name)) continue;
    const t = fs.readFileSync(p, 'utf8');
    files++;
    for (const pat of pats) {
      const m = t.match(new RegExp(pat, 'g'));
      if (m) counts[pat] = (counts[pat] || 0) + m.length;
    }
  }
}

walk('src');
console.log('files scanned (excl admin/home2/home/shared-done):', files);
for (const k in counts) console.log(' ', k, counts[k]);
