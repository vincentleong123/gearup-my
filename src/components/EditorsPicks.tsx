import Link from 'next/link';
import { gearList } from '@/data/gear';
import { gearImg } from '@/data/images';
import { formatPrice, getLevelLabel } from '@/lib/utils';

const awards: { slug: string; title: string; badge: string }[] = [
  { slug: 'nikon-d3100-review-malaysia-second-hand-price', title: 'Best Budget Starter', badge: 'Wallet-Friendly' },
  { slug: 'sony-a6100-review-malaysia-second-hand', title: 'Best Value Mirrorless', badge: 'Editor\'s Pick' },
  { slug: 'sony-zv-e10-review-malaysia-second-hand', title: 'Best Vlogging Camera', badge: 'Creator Favorite' },
  { slug: 'insta360-x4-review-malaysia', title: 'Best 360° Camera', badge: 'Most Unique' },
  { slug: 'dji-mini-4-pro-review-malaysia', title: 'Best Drone Under 250g', badge: 'No License Needed' },
  { slug: 'dji-osmo-action-5-pro-review', title: 'Best Action Cam', badge: 'Editor\'s Pick' },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-sm" aria-label={`Rated ${rating} out of 5`}>
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${i < Math.round(rating) ? 'text-amber-400' : 'text-zinc-700'}`} fill="currentColor">
            <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.28 3.95a1 1 0 00.95.69h4.15c.97 0 1.37 1.24.59 1.81l-3.36 2.44a1 1 0 00-.36 1.12l1.28 3.95c.3.92-.76 1.69-1.54 1.12l-3.36-2.44a1 1 0 00-1.18 0l-3.36 2.44c-.78.57-1.84-.2-1.54-1.12l1.28-3.95a1 1 0 00-.36-1.12L2.08 9.38c-.78-.57-.38-1.81.59-1.81h4.15a1 1 0 00.95-.69l1.28-3.95z" />
          </svg>
        ))}
      </span>
      <span className="text-zinc-500 font-semibold">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function EditorsPicks() {
  const medals = ['🥇', '🥈', '🥉', '4', '5', '6'];

  return (
    <section id="top-picks" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[320px] bg-gradient-to-r from-red-600/10 via-purple-600/10 to-pink-600/10 blur-3xl rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm text-purple-300 font-semibold mb-5">
            🏆 GearUp 2026 Editor&apos;s Choice Awards
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Best of 2026</span>, Picked By Us
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            We test, we shoot, we break even. These are the six cameras and gadgets we&apos;d actually spend our own ringgit on this year — all second-hand prices, all Malaysian context.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((a, i) => {
            const g = gearList.find(x => x.slug === a.slug);
            if (!g) return null;
            return (
              <Link
                key={a.slug}
                href={`/gear/${g.slug}`}
                className="group relative block bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-600/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden bg-zinc-900">
                  <img
                    src={gearImg(g.slug)}
                    alt={g.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="grid place-items-center h-9 w-9 rounded-full bg-zinc-950/70 backdrop-blur-sm text-lg font-black border border-white/10">
                      {medals[i]}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30 backdrop-blur-sm">
                      {a.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="bg-zinc-950/70 backdrop-blur-sm text-white font-bold px-3 py-1.5 rounded-lg">
                      {a.title}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-lg group-hover:text-purple-300 transition-colors">{g.name}</h3>
                    <span className="text-green-400 font-black whitespace-nowrap">{formatPrice(g.priceUsed)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Stars rating={g.rating} />
                    <span className="text-xs text-zinc-500 bg-zinc-800/70 px-2 py-0.5 rounded-full">{getLevelLabel(g.level)}</span>
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-4">{g.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-zinc-500">ROI Score</div>
                    <div className="text-sm font-black text-green-400">{g.roiScore}/100</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
