'use client';

import { useState } from 'react';
import { glossary, GlossaryTerm } from '@/data/glossary';

const categories = [
  { id: 'all', label: 'All Terms' },
  { id: 'camera', label: 'Camera' },
  { id: 'audio', label: 'Audio' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'software', label: 'Software' },
  { id: 'general', label: 'General' },
];

export default function GlossaryClient() {
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = glossary.filter(t => {
    const matchCategory = active === 'all' || t.category === active;
    const matchSearch = search === '' ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.shortDef.toLowerCase().includes(search.toLowerCase()) ||
      (t.manglish && t.manglish.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search terms... (e.g. ISO, bokeh, aperture)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                active === c.id
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                  : 'bg-zinc-800/50 text-zinc-400 hover:text-white border border-zinc-700/50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(t => (
          <div
            key={t.term}
            className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === t.term ? null : t.term)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-lg">{t.term}</span>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">{t.category}</span>
                </div>
                <p className="text-sm text-zinc-400">{t.shortDef}</p>
              </div>
              <span className="text-zinc-500 ml-4">{expanded === t.term ? '▲' : '▼'}</span>
            </button>
            {expanded === t.term && (
              <div className="px-4 pb-4 border-t border-zinc-800 pt-3 space-y-3">
                <p className="text-zinc-300 leading-relaxed">{t.longDef}</p>
                {t.manglish && (
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Manglish version</span>
                    <p className="text-zinc-300 mt-1">&quot;{t.manglish}&quot;</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-500">No terms found. Try a different search.</p>
        </div>
      )}

      <div className="text-center text-sm text-zinc-600 mt-8">
        {glossary.length} terms · Tap any term to expand
      </div>
    </div>
  );
}
