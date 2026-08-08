'use client';

import { useState } from 'react';
import { getGearScenarios } from '@/data/images';

interface Props {
  gearSlug: string;
}

const platforms = [
  { id: 'instagram', label: 'Instagram', icon: '📸', hint: 'Hashtag' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵', hint: 'Hashtag' },
  { id: 'youtube', label: 'YouTube', icon: '▶️', hint: 'Search' },
  { id: 'google', label: 'Google', icon: '🔍', hint: 'Search' },
] as const;

type PlatformId = (typeof platforms)[number]['id'];

// Curated live-search tags per scenario — real tags creators in Malaysia use
const scenarioSearch: Record<string, { hashtags: string[]; terms: string[] }> = {
  'iphone-window-light': { hashtags: ['naturallightportrait', 'phonevideography'], terms: ['iPhone natural window light selfie', 'phone video natural light'] },
  'nikon-d3100-starter': { hashtags: ['nikond3100', 'budgetdslr'], terms: ['Nikon D3100 kit lens photo', 'budget DSLR content creator'] },
  'sony-a6100-vlog': { hashtags: ['sonya6100', 'mirrorlessmalaysia'], terms: ['Sony A6100 flip screen vlog', 'mirrorless vlog setup'] },
  'insta360-action': { hashtags: ['insta360x4', 'insta360malaysia'], terms: ['Insta360 X4 invisible stick', '360 action cam video'] },
  'drone-aerial-malaysia': { hashtags: ['dronemalaysia', 'aerialsabah'], terms: ['DJI Mini 4 Pro aerial Malaysia', 'drone aerial video'] },
  'gopro-chest-mount': { hashtags: ['goprohero', 'chestmountpov'], terms: ['GoPro chest mount POV motorcycle', 'action cam POV vlog'] },
  'food-overhead': { hashtags: ['foodtiktokmy', 'overheadshot'], terms: ['food overhead phone mount tiktok', 'malaysian food content'] },
  'desk-setup-ring-light': { hashtags: ['desksetup', 'ringlightmalaysia'], terms: ['ring light desk setup', 'content creator setup malaysia'] },
  'lapel-mic-audio': { hashtags: ['audiomatters', 'lapelmic'], terms: ['lapel microphone review setup', 'audio for video creators'] },
  'used-camera-shop': { hashtags: ['usedcamera', 'cameramalaysia'], terms: ['used camera shop malaysia', 'second hand camera mudah'] },
  'beauty-review-setup': { hashtags: ['beautytiktok', 'skincaremy'], terms: ['beauty review setup', 'makeup content creator setup'] },
  'eye-closeup-look': { hashtags: ['eyecloseup', 'portraitmalaysia'], terms: ['close up eye looking at camera', 'eye contact portrait malaysia'] },
  'girl-creator-portrait': { hashtags: ['girlcreator', 'malaysiancreators'], terms: ['girl holding camera portrait', 'woman content creator malaysia'] },
  'bts-portrait-shoot': { hashtags: ['behindthescenes', 'photoshootbts'], terms: ['behind the scenes photoshoot malaysia', 'photographer holding camera portrait'] },
  'kpop-dance-filming': { hashtags: ['kpopdancecover', 'dancecovermalaysia'], terms: ['kpop dance cover malaysia', 'filming dance video vlog'] },
  'travel-vlog-malaysia': { hashtags: ['travelmalaysia', 'vlogmalaysia'], terms: ['travel vlog malaysia', 'malaysian travel vlogger'] },
};

function buildUrl(key: string, platform: PlatformId): string {
  const info = scenarioSearch[key] || { hashtags: ['contentcreator'], terms: ['content creator malaysia'] };
  const tag = (info.hashtags[0] || '').replace('#', '').trim();
  const terms = info.terms.join(' ');
  switch (platform) {
    case 'instagram': return `https://www.instagram.com/explore/tags/${encodeURIComponent(tag)}/`;
    case 'tiktok': return `https://www.tiktok.com/tag/${encodeURIComponent(tag)}`;
    case 'youtube': return `https://www.youtube.com/results?search_query=${encodeURIComponent(terms)}`;
    case 'google': return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(terms)}`;
  }
}

export default function ScenarioGallery({ gearSlug }: Props) {
  const scenarios = getGearScenarios(gearSlug);
  const [activeIdx, setActiveIdx] = useState(0);

  if (scenarios.length === 0) return null;

  const active = scenarios[activeIdx];
  const activeKey = active.key;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Real Creator Setups</h2>
        <span className="text-xs text-zinc-500">Tap to switch scene</span>
      </div>
      <p className="text-sm text-zinc-400 mb-4">
        Curated references for this setup — plus one-tap live searches on the platforms Malaysian creators actually post on.
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
      </div>

      {/* Curated live searches — one tap per platform */}
      <div className="mt-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <span className="text-sm font-bold">🔴 See real creators doing this — live</span>
          <span className="text-[11px] text-zinc-500">curated hashtags + searches</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {platforms.map(p => {
            const tag = scenarioSearch[activeKey]?.hashtags[0] || 'contentcreator';
            const term = scenarioSearch[activeKey]?.terms[0] || 'content creator malaysia';
            const label = (p.id === 'instagram' || p.id === 'tiktok') ? `#${tag.replace('#', '')}` : term;
            return (
              <a
                key={p.id}
                href={buildUrl(activeKey, p.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/15 transition-all"
              >
                {p.icon} {p.label}: <span className="text-white truncate max-w-[160px]">{label}</span> ↗
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
