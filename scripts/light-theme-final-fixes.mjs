// Final light-theme fixes: dark-translucent inputs, CTAs, inactive filter chips.
import fs from 'node:fs';

const fixes = [
  // secondary CTA buttons that were dark glass → solid black pill
  ['src/app/[lang]/curate/page.tsx', 'bg-zinc-800/50 text-white', 'bg-zinc-900 text-white'],
  ['src/app/[lang]/gigs/page.tsx', 'bg-zinc-800/50 text-white', 'bg-zinc-900 text-white'],
  ['src/app/[lang]/gigs/[slug]/page.tsx', 'bg-zinc-800/50 text-white', 'bg-zinc-900 text-white'],
  // inactive filter chips → light
  ['src/app/[lang]/glossary/GlossaryClient.tsx', 'bg-zinc-800/50 text-zinc-600 hover:text-white', 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'],
  ['src/components/BlogList.tsx', 'bg-zinc-800/50 text-zinc-600 hover:text-white', 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'],
  ['src/components/CurationWall.tsx', 'bg-zinc-800/50 text-zinc-600 hover:text-white', 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'],
  ['src/components/GearGrid.tsx', 'bg-zinc-800/50 text-zinc-600 hover:text-white', 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'],
  ['src/components/HashtagGlossary.tsx', 'bg-zinc-800/50 text-zinc-600 hover:text-white', 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'],
  ['src/components/ScenarioGallery.tsx', 'bg-zinc-800/50 text-zinc-600 hover:text-white', 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'],
  // glossary search input (dark glass) → light input
  ['src/app/[lang]/glossary/GlossaryClient.tsx', 'bg-zinc-900/80 border border-zinc-200 rounded-xl text-white placeholder-zinc-500', 'bg-white border border-zinc-300 rounded-xl text-zinc-900 placeholder-zinc-400'],
  // ask-anything input
  ['src/components/AskAnything.tsx', 'bg-zinc-800/60 border border-zinc-300 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600', 'bg-white border border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400'],
  // roi inactive chip
  ['src/components/RoiCalculator.tsx', 'bg-zinc-800/60 text-zinc-900 border-zinc-300/60 hover:text-white', 'bg-zinc-100 text-zinc-900 border-zinc-300/60'],
  // hashtag result chip
  ['src/components/HashtagGlossary.tsx', 'bg-zinc-800/60 border border-zinc-300/50 text-cyan-300', 'bg-zinc-100 border border-zinc-300/50 text-cyan-700'],
];

for (const [file, from, to] of fixes) {
  let t = fs.readFileSync(file, 'utf8');
  const n = t.split(from).length - 1;
  if (n === 0) { console.log(`MISS ${file}: ${from.slice(0, 60)}`); continue; }
  t = t.split(from).join(to);
  fs.writeFileSync(file, t);
  console.log(`OK ${file}: ${from.slice(0, 50)} x${n}`);
}
