import { readFileSync, writeFileSync } from 'fs';

const path = 'src/data/gearLibrary.ts';
let text = readFileSync(path, 'utf8');
const lines = text.split('\n');

// In-word apostrophes (letter'Sletter) are always safe to curl — a legitimate
// string delimiter can never have a letter on BOTH sides.
let fixed = 0;
const out = lines.map(l => {
  if (!/\{ id: '/.test(l)) return l;
  return l.replace(/(?<=[a-zA-Z])'(?=[a-zA-Z])/g, () => { fixed++; return '\u2019'; });
});
text = out.join('\n');
writeFileSync(path, text);
console.log('curled in-word apostrophes:', fixed);

// Report lines that still look broken: odd number of remaining ASCII quotes
const bad = [];
text.split('\n').forEach((l, i) => {
  if (!/\{ id: '/.test(l)) return;
  const q = (l.match(/'/g) || []).length;
  if (q % 2 !== 0 || !/\},\s*$/.test(l)) bad.push({ line: i + 1, quotes: q, text: l.slice(0, 120) });
});
if (bad.length) {
  console.log('STILL BROKEN LINES:');
  bad.forEach(b => console.log(`#${b.line} (${b.quotes} quotes): ${b.text}`));
} else {
  console.log('all entry lines structurally sane.');
}
