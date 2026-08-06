'use client';

import { useMemo, useState } from 'react';
import { gearList, categories, GearItem } from '@/data/gear';
import { formatPrice, roiColor, roiBarColor, getLevelLabel } from '@/lib/utils';
import { gearImg } from '@/data/images';
import Link from 'next/link';

const fallbackImgs: Record<string, string> = {
  camera: 'https://images.unsplash.com/photo-1516035066931-62601d7af140?w=800&h=600&fit=crop',
  mobile: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&h=600&fit=crop',
  drone: 'https://images.unsplash.com/photo-1506943057087-5f4d4f5c0b7a?w=800&h=600&fit=crop',
  action: 'https://images.unsplash.com/photo-1625719497441-c1b0c6af22fb?w=800&h=600&fit=crop',
};

type SortKey = 'featured' | 'roi' | 'rating' | 'price-low' | 'price-high';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${i < Math.round(rating) ? 'text-amber-400' : 'text-zinc-700'}`} fill="currentColor">
            <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.28 3.95a1 1 0 00.95.69h4.15c.97 0 1.37 1.24.59 1.81l-3.36 2.44a1 1 0 00-.36 1.12l1.28 3.95c.3.92-.76 1.69-1.54 1.12l-3.36-2.44a1 1 0 00-1.18 0l-3.36 2.44c-.78.57-1.84-.2-1.54-1.12l1.28-3.95a1 1 0 00-.36-1.12L2.08 9.38c-.78-.57-.38-1.81.59-1.81h4.15a1 1 0 00.95-.69l1.28-3.95z" />
          </svg>
        ))}
      </span>
    </div>
  );
}

function AwardBadge({ g }: { g: GearItem }) {
  if (g.roiScore >= 93) {
    return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-300 border border-green-500/30 uppercase tracking-wide">🏆 2026 Top Pick</span>;
  }
  if (g.roiScore >= 86 || g.rating >= 4.5) {
    return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wide">⭐ Great Value</span>;
  }
  return null;
}

export default function GearGrid({ withHeader = true }: { withHeader?: boolean }) {
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('featured');

  const filtered = useMemo(() => {
    let list = active === 'all' ? [...gearList] : gearList.filter(g => g.category === active);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.type.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'roi':
        return list.sort((a, b) => b.roiScore - a.roiScore);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'price-low':
        return list.sort((a, b) => (a.priceUsed || a.priceNew) - (b.priceUsed || b.priceNew));
      case 'price-high':
        return list.sort((a, b) => (b.priceUsed || b.priceNew) - (a.priceUsed || a.priceNew));
      default:
        return list;
    }
  }, [active, query, sort]);

  return (
    <section id="gear" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          {withHeader && (
            <>
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 font-semibold mb-5">
                📷 The Review Lab
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Gear That <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">Pays You Back</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
                Second-hand prices, honest reviews, and real ROI data for Malaysian creators. Filter, search, and sort by what matters to you.
              </p>
            </>
          )}

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 mb-8">
            <div className="relative flex-1 max-w-md w-full mx-auto">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search gear, e.g. 'drone' or 'mirrorless'..."
                className="w-full bg-zinc-800/60 border border-zinc-700 rounded-full pl-11 pr-4 py-2.5 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 transition-all"
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="bg-zinc-800/60 border border-zinc-700 rounded-full px-4 py-2.5 text-sm font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 transition-all"
              aria-label="Sort gear"
            >
              <option value="featured">Sort: Featured</option>
              <option value="roi">Highest ROI</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

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

          <p className="text-xs text-zinc-600 mt-5">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''} · prices are typical second-hand in MYR
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((g, i) => (
            <Link
              href={`/gear/${g.slug}`}
              key={g.slug}
              className="group block bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/5 hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="h-48 relative overflow-hidden bg-zinc-900">
                <img
                  src={gearImg(g.slug) || fallbackImgs[g.category] || fallbackImgs.camera}
                  alt={g.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    g.level === 'beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    g.level === 'mid' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {getLevelLabel(g.level)}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                  <span className="bg-zinc-900/70 backdrop-blur-sm text-white text-sm font-bold px-2.5 py-1 rounded-lg">{g.name}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold group-hover:text-red-400 transition-colors">{g.name}</h3>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2.5 py-1 rounded-full whitespace-nowrap">{g.type}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <Stars rating={g.rating} />
                  <AwardBadge g={g} />
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
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">ROI Score</span>
                    <span className={`font-bold ${roiColor(g.roiScore)}`}>{g.roiScore}/100</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${roiBarColor(g.roiScore)}`} style={{ width: `${g.roiScore}%` }} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {g.pros.slice(0, 2).map(p => (
                    <span key={p} className="text-xs text-green-400/80 bg-green-500/5 px-2 py-0.5 rounded">+{p.length > 25 ? p.slice(0, 25) + '…' : p}</span>
                  ))}
                </div>
                <div className="text-sm font-bold text-red-400/80 group-hover:text-red-300 transition-colors">
                  Read full review →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-zinc-400 font-semibold">No gear matches &quot;{query}&quot;. Try another search or clear the filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
