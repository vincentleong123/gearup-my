// Dump distinct flagged class patterns for one page (grouped counts).
const BASE = process.env.BASE || 'http://localhost:3002';
const PAGE = process.argv[2] || '/en/videos';
const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'path', 'circle', 'rect', 'stop', 'line', 'polygon', 'polyline', 'ellipse', 'use', 'source']);
const DARK_BG = /(?:^|\s)(?:bg-zinc-9\d\d|bg-zinc-8\d\d|bg-zinc-700|bg-black|bg-\[#0[0-9a-f]{5}\]|bg-\[#1[0-9a-f]{5}\]|bg-gradient-to-\w+|from-black|from-zinc-9\d\d)(?:\s|\/\d|$)/;
const TEXT_LIGHT = /(?:^|\s)(text-white|text-zinc-(?:50|100|200|300))(?=\s|$)/;

const html = await (await fetch(BASE + PAGE)).text();
const stack = [];
const seen = {};
const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
let m;
while ((m = tagRe.exec(html))) {
  const [full, rawTag, attrs] = m;
  const tag = rawTag.toLowerCase();
  if (full.startsWith('</')) { stack.pop(); continue; }
  const selfClose = full.endsWith('/>') || VOID.has(tag);
  const cm = /\bclass(?:Name)?="([^"]*)"/.exec(attrs);
  const classes = cm ? cm[1] : '';
  const hasOwnDark = DARK_BG.test(classes);
  const dark = hasOwnDark || (stack.length ? stack[stack.length - 1].dark : false);
  const lt = (classes.match(TEXT_LIGHT) || [])[1];
  if (lt && !dark) {
    const k = `${tag} [${lt}] ${classes.slice(0, 100)}`;
    seen[k] = (seen[k] || 0) + 1;
  }
  if (selfClose) continue;
  stack.push({ dark });
}
for (const k in seen) console.log(`${seen[k]}x ${k}`);
