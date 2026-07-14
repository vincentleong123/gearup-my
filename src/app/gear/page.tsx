import { Metadata } from 'next';
import Link from 'next/link';
import { gearList, categories } from '@/data/gear';
import { formatPrice, roiColor, roiBarColor, getLevelLabel } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Compare Camera & Content Creation Gear | Second-Hand Prices Malaysia',
  description: 'Browse all camera, drone, action cam, and mobile gear reviewed for Malaysian creators. Filter by type, compare second-hand prices in MYR, check ROI scores.',
  openGraph: { title: 'Gear Comparison — GearUp Malaysia', description: 'Compare second-hand gear prices and ROI for Malaysian content creators.' },
};

export default function GearPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">Gear Reviews</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Every piece of gear reviewed for Malaysian creators. Prices in Ringgit Malaysia. Second-hand prices prioritized.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gearList.map((g, i) => (
            <Link
              key={g.slug}
              href={`/gear/${g.slug}`}
              className="group block bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300"
            >
              <div className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-5xl relative">
                <span className="opacity-30">{g.category === 'camera' ? '📷' : g.category === 'mobile' ? '📱' : g.category === 'drone' ? '🛸' : '🎥'}</span>
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    g.level === 'beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    g.level === 'mid' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>{getLevelLabel(g.level)}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-lg font-bold group-hover:text-red-400 transition-colors">{g.name}</h2>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2.5 py-1 rounded-full whitespace-nowrap">{g.type}</span>
                </div>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{g.excerpt}</p>
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    <span className="text-xs text-zinc-500">From</span>
                    <div className="text-xl font-bold text-green-400">{formatPrice(g.priceUsed)}</div>
                  </div>
                  {g.priceNew > 0 && (
                    <div>
                      <span className="text-xs text-zinc-500">New</span>
                      <div className="text-sm text-zinc-400 line-through">{formatPrice(g.priceNew)}</div>
                    </div>
                  )}
                </div>
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">ROI Score</span>
                    <span className={`font-bold ${roiColor(g.roiScore)}`}>{g.roiScore}/100</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${roiBarColor(g.roiScore)}`} style={{ width: `${g.roiScore}%` }} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.pros.slice(0, 2).map(p => (
                    <span key={p} className="text-xs text-green-400/80 bg-green-500/5 px-2 py-0.5 rounded">+{p.length > 25 ? p.slice(0, 25) + '…' : p}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
