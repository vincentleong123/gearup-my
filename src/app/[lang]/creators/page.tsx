import { Metadata } from 'next';
import Link from 'next/link';
import { creators } from '@/data/creators';
import { h } from '@/lib/utils';
import { T } from '@/components/T';
import { langAlternates, withLang } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Malaysian Content Creator Stories — Who Earns What | Kameralog MY',
    description: 'Illustrative Malaysian creator stories — the gear, the gigs, and how long each setup takes to pay for itself. Advice for Tim, Ahmad, and anyone starting from zero.',
    openGraph: { title: 'Creator Stories — Kameralog Malaysia', description: 'See what Malaysian content creators actually earn and the gear they use.' },
    ...langAlternates(lang, '/creators'),
  };
}

export default async function CreatorsPage({ params }: Props) {
  const { lang } = await params;
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <T k="creators.hero.head" en="Creator" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"><T k="creators.hero.accent" en="Stories" /></span>
          </h1>
          <p className="text-zinc-200 max-w-xl mx-auto text-lg">
            <T k="creators.hero.desc" en="Illustrative Malaysian creator journeys — the gear, the gigs, and how fast each setup can pay for itself." />
          </p>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mt-2">
            <T k="creators.hero.note" en="These are realistic examples based on typical Malaysian gig rates, not profiles of real individuals." />
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((c, i) => (
            <Link
              key={c.slug}
              href={withLang('en', `/creators/${c.slug}`)}
              className="group block bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-2xl font-black text-cyan-400">
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-lg group-hover:text-cyan-400 transition-colors">{c.name}</div>
                  <div className="text-sm text-zinc-500">{c.handle}</div>
                </div>
              </div>
              <div className="text-xs text-cyan-400/80 bg-cyan-500/5 px-3 py-1 rounded-full inline-block mb-3 font-semibold">{c.niche}</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.gear.map(g => (
                  <span key={g} className="text-xs text-zinc-200 bg-zinc-800/50 px-2 py-0.5 rounded">{g}</span>
                ))}
              </div>
              <p className="text-zinc-200 text-sm line-clamp-3 mb-4">{c.story}</p>
              <div className="flex gap-3">
                <div className="flex-1 bg-zinc-800/50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-green-400">RM {c.monthlyEarningsMin.toLocaleString()}+</div>
                  <div className="text-xs text-zinc-500"><T k="creators.perMonth" en="/month" /></div>
                </div>
                <div className="flex-1 bg-zinc-800/50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-cyan-400">{c.roiMonths} mo</div>
                  <div className="text-xs text-zinc-500"><T k="creators.breakeven" en="breakeven" /></div>
                </div>
                <div className="flex-1 bg-zinc-800/50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-zinc-100">{c.startedWith.length > 15 ? c.startedWith.slice(0, 12) + '…' : c.startedWith}</div>
                  <div className="text-xs text-zinc-500"><T k="creators.starterKit" en="starter kit" /></div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <div className="text-xs text-zinc-500 italic leading-relaxed line-clamp-2">&ldquo;{h(c.advice.slice(0, 120))}&rdquo;</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
