
import { readFileSync, writeFileSync } from 'fs';
const path = 'src/data/gearLibrary.ts';
let text = readFileSync(path, 'utf8');
let fixed = 0;
text = text.split('\n').map(l => {
  if (!/\{ id: '/.test(l)) return l;
  return l.replace(/(?<=[a-zA-Z])'(?= [a-z])/g, () => { fixed++; return '\u2019'; });
}).join('\n');
writeFileSync(path, text);
console.log('curled trailing possessives:', fixed);
const bad = [];
text.split('\n').forEach((l, i) => {
  if (!/\{ id: '/.test(l)) return;
  const q = (l.match(/'/g) || []).length;
  if (q % 2 !== 0 || !/\},\s*$/.test(l)) bad.push((i+1));
});
console.log('still broken:', bad.length ? bad.join(',') : 'none');

