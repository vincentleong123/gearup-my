'use client';

import { useState } from 'react';
import { glossary } from '@/data/glossary';
import { useLang } from '@/i18n/context';

export default function GlossaryClient() {
  const { t } = useLang();
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: t('glossary.cat.all', 'All Terms') },
    { id: 'camera', label: t('glossary.cat.camera', 'Camera') },
    { id: 'audio', label: t('glossary.cat.audio', 'Audio') },
    { id: 'lighting', label: t('glossary.cat.lighting', 'Lighting') },
    { id: 'software', label: t('glossary.cat.software', 'Software') },
    { id: 'general', label: t('glossary.cat.general', 'General') },
  ];

  const catLabel = (id: string) => categories.find(c => c.id === id)?.label || id;

  const filtered = glossary.filter(term => {
    const matchCategory = active === 'all' || term.category === active;
    const matchSearch = search === '' ||
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.shortDef.toLowerCase().includes(search.toLowerCase()) ||
      (term.manglish && term.manglish.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder={t('glossary.search', 'Search terms... (e.g. ISO, bokeh, aperture)')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 bg-white border border-zinc-300 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-red-500/50"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                active === c.id
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 border border-zinc-300/50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(term => (
          <div
            key={term.term}
            className="bg-white/60 border border-zinc-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === term.term ? null : term.term)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-100/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-lg">{term.term}</span>
                  <span className="text-xs text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">{catLabel(term.category)}</span>
                </div>
                <p className="text-sm text-zinc-600">{term.shortDef}</p>
              </div>
              <span className="text-zinc-600 ml-4">{expanded === term.term ? '▲' : '▼'}</span>
            </button>
            {expanded === term.term && (
              <div className="px-4 pb-4 border-t border-zinc-200 pt-3 space-y-3">
                <p className="text-zinc-900 leading-relaxed">{term.longDef}</p>
                {term.manglish && (
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">{t('glossary.manglishVersion', 'Manglish version')}</span>
                    <p className="text-zinc-900 mt-1">&quot;{term.manglish}&quot;</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-600">{t('glossary.noResults', 'No terms found. Try a different search.')}</p>
        </div>
      )}

      <div className="text-center text-sm text-zinc-600 mt-8">
        {t('glossary.count', '{count} terms · Tap any term to expand').replace('{count}', String(glossary.length))}
      </div>
    </div>
  );
}
