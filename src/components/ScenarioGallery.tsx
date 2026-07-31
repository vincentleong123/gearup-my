'use client';

import { useState } from 'react';
import { getGearScenarios } from '@/data/images';

interface Props {
  gearSlug: string;
}

export default function ScenarioGallery({ gearSlug }: Props) {
  const scenarios = getGearScenarios(gearSlug);
  const [activeIdx, setActiveIdx] = useState(0);

  if (scenarios.length === 0) return null;

  const active = scenarios[activeIdx];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Real Creator Setups</h2>
        <span className="text-xs text-zinc-500">Tap to switch scene</span>
      </div>
      <p className="text-sm text-zinc-400 mb-4">
        Search these terms on Google Images, Instagram, or TikTok for real examples of this setup in action.
      </p>
      <div className="flex gap-2 mb-3 flex-wrap">
        {scenarios.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActiveIdx(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              i === activeIdx
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                : 'bg-zinc-800/50 text-zinc-400 hover:text-white border border-zinc-700/50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {active.images.map((url, i) => (
          <a
            key={i}
            href={url.split('?')[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-800 hover:ring-2 hover:ring-red-500/50 transition-all"
          >
            <img
              src={url + '&auto=format'}
              alt={`${active.label} reference ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-3 py-1 rounded-full">
                View full size ↗
              </span>
            </div>
          </a>
        ))}
        {/* Search link */}
        <a
          href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(active.label + ' Malaysia content creator')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 hover:border-red-500/50 hover:bg-zinc-800/50 transition-all p-4 text-center group"
        >
          <span className="text-2xl mb-1">🔍</span>
          <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
            Search Google<br />for more
          </span>
        </a>
      </div>
    </div>
  );
}
