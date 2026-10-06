// Rendered light-theme verification: fetch pages, walk HTML nesting,
// flag elements whose light text (text-white / text-zinc-100..300) sits
// on a light background chain, and count leftover dark classes.
const BASE = process.env.BASE || 'http://localhost:3002';

const PAGES = [
  '/en', '/en/blog', '/en/gear', '/en/gear/dji-mini-4-pro-review-malaysia',
  '/en/gigs', '/en/security', '/en/creators', '/en/glossary', '/en/videos',
  '/en/compare', '/en/quiz', '/en/calculator', '/en/curate', '/en/niche',
  '/en/hashtags', '/en/about', '/en/contact', '/en/advertise',
  '/en/all-articles', '/en/review-policy', '/en/gear-library',
  '/en/blog/best-camera-beginners-malaysia-2026', '/en/author/vincent',
];

const DARK_BG = /(?:^|\s)(?:bg-zinc-9\d\d|bg-zinc-8\d\d|bg-black|bg-\[#0[0-9a-f]{5}\]|bg-\[#1[0-9a-f]{5}\]|bg-red-\d+|bg-pink-\d+|bg-rose-\d+|bg-fuchsia-\d+|bg-purple-\d+|bg-violet-\d+|bg-amber-\d+|bg-orange-\d+|bg-emerald-\d+|bg-green-\d+|bg-cyan-\d+|bg-teal-\d+|bg-blue-\d+|bg-indigo-\d+|bg-gradient-to-\w+|from-black|from-zinc-9\d\d|via-zinc-9\d\d)(?:\s|\/\d|$)/;
const DARKISH = /(?:^|\s)(?:bg-zinc-9\d\d|bg-zinc-8\d\d|bg-black|bg-\[#0[0-9a-f]{5}\]|bg-\[#1[0-9a-f]{5}\]|from-black|from-zinc-9\d\d)(?:\s|\/\d|$)/;
const TEXT_LIGHT = /(?:^|\s)(text-white|text-zinc-(?:50|100|200|300)|text-\[#fafafa\])(?=\s|$)/;
const strip = (c) => c.replace(/(?:hover|group-hover|focus|active|disabled|first|last|sm|md|lg|xl|2xl|dark|data-\S+):text-white/g, '');

const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'path', 'circle', 'rect', 'stop', 'line', 'polygon', 'polyline', 'ellipse', 'use', 'source', 'area', 'col', 'embed', 'track', 'wbr']);

async function scan(page) {
  const res = await fetch(BASE + page);
  const html = await res.text();
  const flags = [];
  const stack = []; // each frame: { dark, classes }
  let darkCount = 0;
  const darkRe = /(?:^|\s)(?:bg-zinc-9\d\d|bg-zinc-8\d\d|bg-\[#09090b\]|text-zinc-(?:50|100|200|300)|border-zinc-(?:700|800|900)|bg-\[#0d0d0f\])(?=\s|$)/g;
  for (const m of html.match(darkRe) || []) darkCount++;

  const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
  let m;
  while ((m = tagRe.exec(html))) {
    const [full, rawTag, attrs] = m;
    const tag = rawTag.toLowerCase();
    const closing = full.startsWith('</');
    const selfClose = full.endsWith('/>') || VOID.has(tag);
    if (closing) { stack.pop(); continue; }
    const cm = /\bclass(?:Name)?="([^"]*)"/.exec(attrs);
    const classes = cm ? cm[1] : '';
    const hasOwnDark = DARK_BG.test(classes);
    const dark = hasOwnDark || (stack.length ? stack[stack.length - 1].dark : false);
    const lightTok = (strip(' ' + classes).match(TEXT_LIGHT) || [])[0];
    if (lightTok && !dark) flags.push(`${tag}: ${lightTok.trim()} on light chain :: ${classes.slice(0, 110)}`);
    if (selfClose) continue; // void/self-closing: never pushed
    stack.push({ dark });
  }
  return { page, status: res.status, darkCount, flags };
}

let total = 0;
for (const p of PAGES) {
  try {
    const r = await scan(p);
    total += r.flags.length;
    console.log(`${r.status} ${r.page}  dark-tokens=${r.darkCount}  flags=${r.flags.length}`);
    for (const f of r.flags.slice(0, 8)) console.log('    ' + f);
    if (r.flags.length > 8) console.log(`    ... +${r.flags.length - 8} more`);
  } catch (e) {
    console.log(`ERR ${p}: ${e.message}`);
  }
}
console.log(`\nTOTAL FLAGS: ${total}`);
