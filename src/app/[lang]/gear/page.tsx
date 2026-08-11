import { Metadata } from 'next';
import Link from 'next/link';
import { gearList } from '@/data/gear';
import { formatPrice, roiColor, roiBarColor } from '@/lib/utils';
import GearGrid from '@/components/GearGrid';
import { T } from '@/components/T';
import { langAlternates, withLang } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Compare Camera & Content Creation Gear | Second-Hand Prices Malaysia',
    description: 'Browse all camera, drone, action cam, and mobile gear reviewed for Malaysian creators. Filter by type, compare second-hand prices in MYR, check ROI scores.',
    openGraph: { title: 'Gear Comparison — Kameralog Malaysia', description: 'Compare second-hand gear prices and ROI for Malaysian content creators.' },
    ...langAlternates(lang, '/gear'),
  };
}

export default async function GearPage({ params }: Props) {
  const { lang } = await params;
  const featured = [...gearList].sort((a, b) => b.roiScore - a.roiScore).slice(0, 3);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 font-semibold mb-5">
            📷 <T k="gear.hero.badge" en="The Review Lab" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <T k="gear.hero.head" en="All" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500"><T k="gear.hero.accent" en="Gear Reviews" /></span>
          </h1>
          <p className="text-zinc-200 max-w-xl mx-auto text-lg">
            <T k="gear.hero.desc" en="Every piece of gear reviewed for Malaysian creators. Prices in Ringgit Malaysia. Second-hand prices prioritized." />
          </p>
        </div>

        <GearGrid withHeader={false} />

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {featured.map(g => (
            <Link
              key={g.slug}
              href={withLang(lang, `/gear/${g.slug}`)}
              className="group block bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-red-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-xs font-bold text-red-400 mb-2">🏆 <T k="gear.topRoiPick" en="Top ROI Pick" /></div>
              <h2 className="text-lg font-bold group-hover:text-red-400 transition-colors mb-1">{g.name}</h2>
              <p className="text-zinc-200 text-sm line-clamp-2 mb-3">{g.excerpt}</p>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-xs text-zinc-500"><T k="common.used" en="Used" /></span>
                  <div className="font-bold text-green-400">{formatPrice(g.priceUsed)}</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500"><T k="gear.roiScore" en="ROI" /></span>
                    <span className={`font-bold ${roiColor(g.roiScore)}`}>{g.roiScore}</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${roiBarColor(g.roiScore)}`} style={{ width: `${g.roiScore}%` }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
