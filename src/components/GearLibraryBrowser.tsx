'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { LIB_CAT_LABEL, LIB_ERAS, type LibCat, type LibraryEntry } from '@/data/gearLibrary';
import { withLang } from '@/lib/lang';

const CAT_ICON: Record<LibCat, string> = {
  dslr: '🎥', mirrorless: '📸', lens: '🔭', flash: '⚡', adapter: '🔌',
  gimbal: '🎚️', tripod: '🦵', audio: '🎙️', lighting: '💡', filter: '🪟',
  storage: '💾', battery: '🔋', bag: '🎒', drone: '🚁', action: '🏄',
  phone: '📱', monitor: '🖥️',
};

export default function GearLibraryBrowser({ entries, lang }: { entries: LibraryEntry[]; lang: string }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<'all' | LibCat>('all');
  const [era, setEra] = useState<'all' | string>('all');
  const [year, setYear] = useState<number | null>(null);
  const [spot, setSpot] = useState<LibraryEntry | null>(null);

  const catCounts = useMemo(() => {
    const m = new Map<LibCat, number>();
    entries.forEach(e => m.set(e.cat, (m.get(e.cat) || 0) + 1));
    return m;
  }, [entries]);

  const eraById = useMemo(() => Object.fromEntries(LIB_ERAS.map(e => [e.id, e])), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const eraYears = era === 'all' ? null : eraById[era]?.years ?? null;
    return entries
      .filter(e => (cat === 'all' || e.cat === cat))
      .filter(e => (!eraYears || eraYears.includes(e.year)) && (!year || e.year === year))
      .filter(e => !q || `${e.name} ${e.brand} ${e.note} ${e.mount || ''}`.toLowerCase().includes(q))
      .sort((a, b) => b.year - a.year || a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));
  }, [entries, query, cat, era, year, eraById]);

  const brands = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach(e => m.set(e.brand, (m.get(e.brand) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [filtered]);

  const yearRail = useMemo(() => {
    const m = new Map<number, number>();
    entries.forEach(e => m.set(e.year, (m.get(e.year) || 0) + 1));
    return [...m.entries()].sort((a, b) => a[0] - b[0]);
  }, [entries]);

  const reset = () => { setQuery(''); setCat('all'); setEra('all'); setYear(null); };

  const surprise = () => {
    // Roll from everything, not just the current filter — the point is to meet
    // a stranger, not someone you already filtered to.
    const pick = entries[Math.floor(Math.random() * entries.length)];
    setSpot(pick);
    setQuery(''); setCat('all'); setEra('all'); setYear(null);
    requestAnimationFrame(() => document.getElementById(`lib-${pick.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  };

  return (
    <section>
      {/* Era timeline rail */}
      <div className="border-y border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-stretch gap-px overflow-x-auto py-3">
            {LIB_ERAS.map(e => (
              <button
                key={e.id}
                onClick={() => { setEra(era === e.id ? 'all' : e.id); setYear(null); }}
                className={`shrink-0 text-left px-4 py-2 rounded-xl mx-1 transition-all ${era === e.id ? 'bg-red-600 text-white' : 'bg-zinc-50 border border-zinc-200 hover:border-red-300'}`}
              >
                <span className="block font-mono text-xs font-bold">{e.label}</span>
                <span className={`block text-[10px] uppercase tracking-widest mt-0.5 ${era === e.id ? 'text-white/80' : 'text-zinc-400'}`}>
                  {e.label.split('–')[0]}s
                </span>
              </button>
            ))}
            <span className="flex-1 min-w-[8px]" />
            <button
              onClick={surprise}
              className="shrink-0 px-4 py-2 rounded-xl mx-1 bg-zinc-900 text-white text-xs font-bold hover:bg-red-600 transition-colors"
            >
              🎲 Surprise me
            </button>
          </div>
          {era !== 'all' && (
            <p className="pb-3 text-sm text-zinc-600 max-w-3xl">
              <span className="font-bold text-red-600">{eraById[era]?.label}:</span> {eraById[era]?.blurb}{' '}
              <button onClick={() => setEra('all')} className="underline underline-offset-2 text-zinc-400 hover:text-zinc-700">clear era ✕</button>
            </p>
          )}
          {/* Year scrubber */}
          <div className="pb-3 flex gap-1 overflow-x-auto">
            {yearRail.map(([y, n]) => (
              <button
                key={y}
                onClick={() => { setYear(year === y ? null : y); }}
                className={`shrink-0 font-mono text-[11px] px-2 py-1 rounded-md border transition-colors ${year === y ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-200 text-zinc-500 hover:border-zinc-500'}`}
                title={`${n} entries in ${y}`}
              >
                {y}<span className="text-[9px] opacity-60">·{n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search + category chips */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="flex flex-col md:flex-row gap-3 md:items-center mb-4">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search 16 years of gear — try “GH5”, “nifty”, “sub-250g”, “Godox”…"
              className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-zinc-300 bg-white text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-800">✕</button>
            )}
          </div>
          <p className="text-xs text-zinc-500 whitespace-nowrap font-mono">{filtered.length} / {entries.length} entries</p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <button onClick={() => setCat('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${cat === 'all' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-200'}`}>
            All ({entries.length})
          </button>
          {(Object.keys(LIB_CAT_LABEL) as LibCat[]).map(c => (
            <button
              key={c}
              onClick={() => { setCat(cat === c ? 'all' : c); setYear(null); }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${cat === c ? 'bg-red-600 text-white border-red-600' : 'bg-white border-zinc-200 text-zinc-600 hover:border-red-400'}`}
            >
              {CAT_ICON[c]} {LIB_CAT_LABEL[c]} ({catCounts.get(c) || 0})
            </button>
          ))}
        </div>

        {/* Live brand facets */}
        {brands.length > 0 && filtered.length !== entries.length && (
          <div className="flex flex-wrap items-center gap-1.5 mb-6 text-zinc-400">
            <span className="text-[10px] uppercase tracking-widest font-bold">Top brands in view:</span>
            {brands.map(([b, n]) => (
              <button key={b} onClick={() => setQuery(b)} className="text-xs px-2 py-1 rounded-md border border-zinc-200 bg-white hover:border-red-400 transition-colors">
                {b} <span className="font-mono text-zinc-400">{n}</span>
              </button>
            ))}
          </div>
        )}

        {spot && (
          <div className="mb-6 rounded-2xl border-2 border-red-500/40 bg-red-50/50 p-5 relative">
            <button onClick={() => setSpot(null)} className="absolute top-3 right-4 text-zinc-400 hover:text-zinc-800" aria-label="Dismiss">✕</button>
            <p className="text-[10px] uppercase tracking-widest text-red-600 font-bold mb-1">🎲 The dice chose</p>
            <p className="font-display text-xl">{spot.year} · {spot.name} <span className="text-sm text-zinc-400">— {spot.used}</span></p>
            <p className="text-sm text-zinc-600 mt-1">{spot.note}</p>
          </div>
        )}

        {/* Results grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-2xl mb-2">Nothing matches that search</p>
            <p className="text-sm text-zinc-500 mb-6">Try a brand name, a mount (RF, Z, MFT), or clear everything.</p>
            <button onClick={reset} className="px-6 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-red-600 transition-colors">Reset filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(e => (
              <article
                key={e.id}
                id={`lib-${e.id}`}
                className="rounded-2xl border border-zinc-200 bg-white p-5 flex flex-col hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xl leading-none">{CAT_ICON[e.cat]}</span>
                  <span className="font-mono text-[11px] font-bold text-zinc-600">{e.year}</span>
                </div>
                <h3 className="font-bold leading-snug text-[15px]">{e.name}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-500">{e.brand}</span>
                  {e.mount && e.mount !== '—' && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-100">{e.mount}</span>
                  )}
                </div>
                <p className="text-[13px] text-zinc-500 mt-2 leading-relaxed flex-1">{e.note}</p>
                <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400">Used MYR</span>
                  <span className="font-mono text-xs font-bold text-zinc-900">{e.used}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 py-10 border-t border-zinc-200 text-center">
          <p className="text-sm text-zinc-500 max-w-xl mx-auto">
            Second-hand bands are indicative Malaysian street prices (Mudah / Carousell / shop-lot boards), not retail quotes.
            For price-to-ROI math on any entry, run it through the{' '}
            <Link href={withLang(lang, '/calculator')} className="font-bold text-red-600 hover:text-zinc-900">ROI calculator</Link>{' '}
            or <Link href={withLang(lang, '/gear')} className="font-bold text-red-600 hover:text-zinc-900">the review database</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
