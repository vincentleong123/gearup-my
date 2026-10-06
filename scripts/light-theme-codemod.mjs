// Dark → light Tailwind codemod (kameralog light-theme rollout).
// Usage: node scripts/light-theme-codemod.mjs [--write]
// Scans quoted class strings only (JSX className="…", ternary '…' pieces).
// Context rules: dark bg + text-white in the SAME string = chip/pill (keep).
// Anything ambiguous is printed as a REVIEW item and left untouched.

import fs from 'node:fs';
import path from 'node:path';

const WRITE = process.argv.includes('--write');
const SKIP_FILES = new Set(['Nav.tsx', 'Footer.tsx', 'ScrollGuide.tsx', 'AdSlot.tsx', 'BackToTop.tsx']);

const GLOBAL_SWAP = [
  [/\btext-zinc-(?:50|100)(?![-\d])/g, 'text-zinc-900'],
  [/\btext-zinc-(?:200|300)(?![-\d])/g, 'text-zinc-600'],
  [/\btext-\[#fafafa\]/g, 'text-zinc-900'],
  [/\bbg-\[#09090b\]/g, 'bg-[#faf9f7]'],
  [/\bbg-\[#101013\]/g, 'bg-white'],
  [/\bbg-\[#16161a\]/g, 'bg-white'],
  [/\bdivide-zinc-(?:800|900)(?![-\d])/g, 'divide-zinc-100'],
  [/\bring-zinc-800(?![-\d])/g, 'ring-zinc-200'],
  [/\bring-zinc-700(?![-\d])/g, 'ring-zinc-300'],
  [/\bhover:bg-zinc-800(?![-\d])/g, 'hover:bg-zinc-100'],
  [/\bborder-zinc-800(?![-\d])/g, 'border-zinc-200'],
  [/\bborder-zinc-700(?![-\d])/g, 'border-zinc-300'],
];

const DARK_BG = /(?:^|\s)((?:bg-zinc-9\d\d|bg-zinc-8\d\d)(?:\/\d{1,3})?)(?=$|\s)/;
// no structural gate: every rule matches exact tailwind tokens, never prose

function flipBgToken(tok) {
  const m = tok.match(/^(bg-zinc-(?:9\d\d|8\d\d))(?:\/(\d{1,3}))?$/);
  if (!m) return null;
  const [, base, op] = m;
  const z95 = base === 'bg-zinc-955';
  const z90 = base === 'bg-zinc-900';
  const light = z95 || z90 ? 'bg-white' : 'bg-zinc-100';
  return op ? `${light}/${op}` : light;
}

function processString(s) {
  const changes = [];
  let out = s;
  for (const [re, to] of GLOBAL_SWAP) {
    out = out.replace(re, (m0) => {
      changes.push(`${m0}→${to}`);
      return to;
    });
  }

  const hasWhiteText = /\btext-white\b/.test(out);
  const darkBg = out.match(DARK_BG);

  if (darkBg) {
    if (hasWhiteText) {
      // dark chip / image pill — by design
    } else {
      const flipped = flipBgToken(darkBg[1].trim());
      if (flipped) {
        out = out.replace(darkBg[1].trim(), flipped);
        changes.push(`${darkBg[1].trim()}→${flipped}`);
      }
    }
  }

  // hover:bg-zinc-900 → light hover unless outline-to-fill button
  if (/\bhover:bg-zinc-900\b/.test(out) && !/\bhover:text-white\b/.test(out)) {
    out = out.replace(/\bhover:bg-zinc-900\b/g, 'hover:bg-zinc-100');
    changes.push('hover:bg-zinc-900→hover:bg-zinc-100');
  }

  // hairline border-zinc-900 → zinc-200 (thick outline buttons keep theirs)
  if (/\bborder-zinc-900\b/.test(out) && !/\bborder-[24]\b/.test(out) && !hasWhiteText) {
    out = out.replace(/\bborder-zinc-900\b/g, 'border-zinc-200');
    changes.push('border-zinc-900→border-zinc-200');
  }

  // hover:text-white on a plain link (no bg of its own) → red hover
  if (/\bhover:text-white\b/.test(out) && !/\bbg-/.test(out) && !/\b(?:gradient|from-|via-|to-)/.test(out)) {
    out = out.replace(/\bhover:text-white\b/g, 'hover:text-red-600');
    changes.push('hover:text-white→hover:text-red-600');
  }

  // border-white/… on a translucent surface = overlay chrome (keep); else hairline on light
  if (/\bborder-white\//.test(out) && !/bg-\S+\/\d/.test(out) && !/\bfrom-|\bvia-|\bto-/.test(out)) {
    out = out.replace(/\bborder-white\/[\d.[\]]+/g, 'border-zinc-200');
    changes.push('border-white/*→border-zinc-200');
  }

  return { s: out, changes };
}

const review = [];
let touchedFiles = 0;
let totalChanges = 0;

function processFile(p) {
  const src = fs.readFileSync(p, 'utf8');
  let out = src;
  let count = 0;

  // review flags computed on the ORIGINAL content
  src.split('\n').forEach((line, i) => {
    if (/\btext-white\b/.test(line) && !/\bbg-/.test(line) && !/(?:gradient|from-|via-|to-)/.test(line)) {
      review.push(`${p}:${i + 1}  text-white no-bg → ${line.trim().slice(0, 140)}`);
    }
    if (/\bbg-white\//.test(line)) {
      review.push(`${p}:${i + 1}  pre-existing bg-white/ → ${line.trim().slice(0, 140)}`);
    }
    if (/\bbg-black(?![-/])/.test(line)) review.push(`${p}:${i + 1}  solid bg-black → ${line.trim().slice(0, 140)}`);
    if (/\bgroup-hover:text-white\b/.test(line)) review.push(`${p}:${i + 1}  group-hover:text-white → ${line.trim().slice(0, 140)}`);
  });

  // quoted strings, single line (className="…" and ternary '…' pieces)
  out = out.replace(/"([^"\n]*)"|'([^'\n]*)'/g, (full, dq, sq) => {
    const inner = dq !== undefined ? dq : sq;
    if (inner == null) return full;
    const { s: next, changes } = processString(inner);
    if (changes.length) {
      count += changes.length;
      const q = dq !== undefined ? '"' : "'";
      return q + next + q;
    }
    return full;
  });

  // review flags on the transformed content
  if (count > 0) {
    touchedFiles++;
    totalChanges += count;
    console.log(`${WRITE ? 'WROTE' : 'DRY'} ${p}: ${count}`);
    if (WRITE) fs.writeFileSync(p, out);
  }
}

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name === 'admin' || e.name === 'home2') continue;
      walk(p);
      continue;
    }
    if (!/\.tsx?$/.test(e.name)) continue;
    if (p === 'src\\app\\[lang]\\page.tsx') continue; // home = light reference
    if (SKIP_FILES.has(e.name)) continue;
    processFile(p);
  }
}

walk('src');
console.log(`\n${WRITE ? 'APPLIED' : 'DRY-RUN'}: ${totalChanges} changes in ${touchedFiles} files`);
console.log(`REVIEW (${review.length}):`);
for (const r of review) console.log('  ' + r);
