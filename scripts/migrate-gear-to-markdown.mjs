/**
 * One-time migration: converts the hardcoded gear items in src/data/gear.ts
 * into individual markdown files under content/gear/.
 *
 * After running this, the sync script (scripts/sync-content.mjs) will
 * pick up the markdown files and generate src/data/generated/gear.ts.
 *
 * Run: node scripts/migrate-gear-to-markdown.mjs
 */
import { mkdirSync, writeFileSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const cwd = process.cwd();
const gearDir = join(cwd, 'content/gear');
mkdirSync(gearDir, { recursive: true });

// ── Extract gearList array from gear.ts ──────────────────────────
const gearSource = readFileSync(join(cwd, 'src/data/gear.ts'), 'utf8');

const arrayStart = gearSource.indexOf('export const gearList: GearItem[] = ');
if (arrayStart === -1) {
  console.error('Could not find gearList array in src/data/gear.ts');
  process.exit(1);
}
const equalsSign = gearSource.indexOf('= ', arrayStart);
const blockStart = gearSource.indexOf('[', equalsSign);
let depth = 0;
let blockEnd = blockStart;
for (let i = blockStart; i < gearSource.length; i++) {
  if (gearSource[i] === '[') depth++;
  if (gearSource[i] === ']') depth--;
  if (depth === 0) { blockEnd = i + 1; break; }
}
const arrayLiteral = gearSource.slice(blockStart, blockEnd);
const gearList = eval(arrayLiteral);

// ── Helpers ──────────────────────────────────────────────────────
function yamlStr(str) {
  if (!str) return "''";
  if (str.includes("'")) return `"${str.replace(/"/g, '\\"')}"`;
  if (/^[\d\W]/.test(str) || str.includes(': ') || str.includes('#')) {
    return `'${str}'`;
  }
  return str;
}

// ── Generate markdown files ──────────────────────────────────────
const existing = new Set(readdirSync(gearDir).filter(f => f.endsWith('.md')));

let created = 0;
let skipped = 0;

for (const item of gearList) {
  const filename = `${item.slug}.md`;
  if (existing.has(filename)) {
    skipped++;
    continue;
  }

  const lines = ['---'];
  lines.push(`slug: ${item.slug}`);
  lines.push(`name: ${item.name}`);
  lines.push(`category: ${item.category}`);
  lines.push(`level: ${item.level}`);
  lines.push(`priceNew: ${item.priceNew}`);
  lines.push(`priceUsed: ${item.priceUsed}`);
  lines.push(`type: ${item.type}`);
  lines.push(`sensor: ${item.sensor}`);
  lines.push(`video: ${item.video}`);
  lines.push(`weight: ${item.weight}`);
  lines.push(`rating: ${item.rating}`);
  lines.push(`roiScore: ${item.roiScore}`);
  lines.push(`excerpt: ${yamlStr(item.excerpt)}`);
  lines.push(`roiDesc: ${yamlStr(item.roiDesc)}`);
  lines.push(`usedTip: ${yamlStr(item.usedTip)}`);
  if (item.pros?.length) {
    lines.push('pros:');
    item.pros.forEach(p => lines.push(`  - "${p.replace(/"/g, '\\"')}"`));
  }
  if (item.cons?.length) {
    lines.push('cons:');
    item.cons.forEach(c => lines.push(`  - "${c.replace(/"/g, '\\"')}"`));
  }
  if (item.creatorUses?.length) {
    lines.push('creatorUses:');
    item.creatorUses.forEach(c => lines.push(`  - ${c}`));
  }
  lines.push('---');

  const body = (item.content || '').trim();
  const file = lines.join('\n') + '\n\n' + body + '\n';

  writeFileSync(join(gearDir, filename), file, 'utf8');
  created++;
}

console.log(`Migration complete: ${created} created, ${skipped} skipped (already exist), ${gearList.length} total`);
