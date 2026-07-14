import Link from 'next/link';
import { creators } from '@/data/creators';
import { h } from '@/lib/utils';

export default function CreatorShowcase() {
  return (
    <section id="creators" className="py-16 md:py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            They Had <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">No Money</span> Too
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Real Malaysian creators who started with nothing. Their gear, their earnings, their advice for Tim & Ahmad.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.slice(0, 6).map((c, i) => (
            <Link
              href={`/creators/${c.slug}`}
              key={c.slug}
              className="group block bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
              style={{ animationDelay: `${i * 80}ms` }}
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
                  <span key={g} className="text-xs text-zinc-400 bg-zinc-800/50 px-2 py-0.5 rounded">{g}</span>
                ))}
              </div>
              <p className="text-zinc-400 text-sm line-clamp-3 mb-4">{c.story}</p>
              <div className="flex gap-3">
                <div className="flex-1 bg-zinc-800/50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-green-400">RM {c.monthlyEarningsMin.toLocaleString()}+</div>
                  <div className="text-xs text-zinc-500">/month</div>
                </div>
                <div className="flex-1 bg-zinc-800/50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-cyan-400">{c.roiMonths} mo</div>
                  <div className="text-xs text-zinc-500">breakeven</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <div className="text-xs text-zinc-500 italic leading-relaxed line-clamp-2">&ldquo;{h(c.advice.slice(0, 120))}&rdquo;</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/creators" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium">
            See all creators →
          </Link>
        </div>
      </div>
    </section>
  );
}
