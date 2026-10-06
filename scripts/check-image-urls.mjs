import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const roots = ['src/data', 'content', 'src/components', 'src/app'];
const urls = new Map();
const locals = new Set();

const scan = d => {
  for (const f of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, f.name);
    if (f.isDirectory()) scan(p);
    else if (/\.(ts|tsx|md|mjs)$/.test(f.name)) {
      const t = readFileSync(p, 'utf8');
      for (const m of t.matchAll(/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]{10,60})/g)) {
        urls.set('https://images.unsplash.com/' + m[1], p);
      }
      for (const m of t.matchAll(/"(\/blog\/[a-zA-Z0-9_.-]+\.(?:jpg|jpeg|png|webp))"/g)) {
        locals.add(m[1]);
      }
    }
  }
};
roots.forEach(scan);
console.log('unsplash urls:', urls.size, 'local refs:', locals.size);

const missing = [...locals].filter(p => !existsSync(join('public', p)));
if (missing.length) console.log('LOCAL MISSING:\n' + missing.join('\n'));
else console.log('locals all ok');

const res = await Promise.all([...urls].map(async ([u, p]) => {
  try {
    const r = await fetch(u, { method: 'HEAD' });
    return r.ok ? null : `${u} -> ${r.status} @${p}`;
  } catch {
    return `${u} -> ERR @${p}`;
  }
}));
const bad = res.filter(Boolean);
console.log('unsplash bad:', bad.length);
bad.forEach(b => console.log(b));
