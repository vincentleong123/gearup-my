'use client';

import { useState, useEffect } from 'react';
import { gearList, categories, GearItem } from '@/data/gear';
import { h, formatPrice, roiColor, roiBarColor, getLevelLabel } from '@/lib/utils';
import Link from 'next/link';

export default function GearGrid() {
  const [active, setActive] = useState('all');
  const [items, setItems] = useState<GearItem[]>([]);

  useEffect(() => {
    setItems(gearList);
  }, []);

  const filtered = active === 'all' ? items : items.filter(g => g.category === active);

  return (
    <section id="gear" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Gear That <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">Pays You Back</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
            Second-hand prices, honest reviews, and real ROI data for Malaysian creators. Filter by what you can afford.
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  active === c.id
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25'
                    : 'bg-zinc-800/50 text-zinc-400 hover:text-white border border-zinc-700/50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((g, i) => (
            <Link
              href={`/gear/${g.slug}`}
              key={g.slug}
              className="group block bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-6xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent z-10" />
                <span className="relative z-0 opacity-30 text-8xl">
                  {g.category === 'camera' ? '📷' : g.category === 'mobile' ? '📱' : g.category === 'drone' ? '🛸' : '🎥'}
                </span>
                <div className="absolute top-3 right-3 z-20">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    g.level === 'beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    g.level === 'mid' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {getLevelLabel(g.level)}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold group-hover:text-red-400 transition-colors">{g.name}</h3>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2.5 py-1 rounded-full whitespace-nowrap">{g.type}</span>
                </div>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{g.excerpt}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <span className="text-xs text-zinc-500">Used Price</span>
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
                    <div className={`h-full rounded-full transition-all duration-1000 ${roiBarColor(g.roiScore)}`} style={{ width: `${g.roiScore}%` }} />
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
    </section>
  );
}
