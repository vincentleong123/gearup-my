import Link from 'next/link';
import { GearItem } from '@/data/gear';
import { getPayoffPath } from '@/data/gigs';

export default function PayoffPath({ gear }: { gear: GearItem }) {
  const paths = getPayoffPath(gear);

  if (paths.length === 0) {
    return (
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 mb-10">
        <h3 className="font-bold text-amber-400 mb-2">💰 Zero to pay off</h3>
        <p className="text-zinc-300 text-sm">
          {gear.name} is already in your pocket. Anything you earn is pure profit. Open the curtains and start shooting today.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 mb-10">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-amber-400 text-lg">💰 How to pay it off</h3>
        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
          {gear.priceUsed > 0 ? `Target: RM ${gear.priceUsed.toLocaleString()}` : 'Already free'}
        </span>
      </div>
      <p className="text-zinc-400 text-sm mb-4">
        Real Malaysian gigs, real rates. Each line = how many of that gig you need to fully own the {gear.name}.
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {paths.map(p => (
          <Link
            key={p.gig.slug}
            href={`/gigs/${p.gig.slug}`}
            className="group flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 hover:border-amber-500/40 hover:bg-zinc-900 transition-all"
          >
            <span className="text-3xl">{p.gig.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm group-hover:text-amber-400 transition-colors truncate">{p.gig.title}</div>
              <div className="text-xs text-zinc-500">
                {p.gig.rateMin === p.gig.rateMax
                  ? `RM ${p.gig.rateMin.toLocaleString()} ${p.gig.rateUnit}`
                  : `RM ${p.gig.rateMin.toLocaleString()}-${p.gig.rateMax.toLocaleString()} ${p.gig.rateUnit}`}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-lg font-black text-amber-400">{p.note}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">to own it</div>
            </div>
          </Link>
        ))}
      </div>
      <p className="text-xs text-zinc-500 mt-4">
        Math: price ÷ rate. If you do 4 gigs a month, the best gig on this list pays off your gear in{' '}
        <strong className="text-amber-400">{paths[0].gig.title}</strong> units — most creators clear it in under a month of weekends.
      </p>
    </div>
  );
}
