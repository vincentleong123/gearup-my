'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CurationTopic {
  id: string;
  label: string;
  emoji: string;
  images: string[];
  hashtags: string[];
  searchTerms: string[];
}

interface Props {
  topics: CurationTopic[];
  title?: string;
}

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop';

const platforms = [
  { id: 'google', label: 'Google', icon: '🔍', hint: 'Search' },
  { id: 'instagram', label: 'Instagram', icon: '📸', hint: 'Hashtag' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵', hint: 'Hashtag' },
  { id: 'youtube', label: 'YouTube', icon: '▶️', hint: 'Search' },
] as const;

type PlatformId = (typeof platforms)[number]['id'];

function buildUrl(topic: CurationTopic, platform: PlatformId): string {
  const terms = topic.searchTerms.join(' ');
  const tag = (topic.hashtags[0] || topic.searchTerms[0]).replace('#', '').trim();
  switch (platform) {
    case 'google':
      return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(terms)}`;
    case 'instagram':
      return `https://www.instagram.com/explore/tags/${encodeURIComponent(tag)}/`;
    case 'tiktok':
      return `https://www.tiktok.com/tag/${encodeURIComponent(tag)}`;
    case 'youtube':
      return `https://www.youtube.com/results?search_query=${encodeURIComponent(terms)}`;
  }
}

function buildDisplay(topic: CurationTopic, platform: PlatformId): string {
  if (platform === 'instagram' || platform === 'tiktok') {
    return '#' + (topic.hashtags[0] || topic.searchTerms[0]).replace('#', '').trim();
  }
  return topic.searchTerms.join(' · ');
}

export default function CurationWall({ topics, title = 'Live Inspiration' }: Props) {
  const [topicIdx, setTopicIdx] = useState(0);
  const [platform, setPlatform] = useState<PlatformId>('google');
  const [rotate, setRotate] = useState(true);
  const [offset, setOffset] = useState(0);

  const topic = topics[topicIdx];

  const shuffle = useCallback(() => {
    const next = Math.floor(Math.random() * topics.length);
    setTopicIdx(next);
    setOffset(Math.floor(Math.random() * Math.max(1, topics[next].images.length)));
  }, [topics.length]);

  // Auto-curate: rotate the visible images every few seconds
  useEffect(() => {
    if (!rotate) return;
    const id = setInterval(() => {
      setOffset(o => (topic ? (o + 1) % Math.max(1, topic.images.length) : o));
    }, 4000);
    return () => clearInterval(id);
  }, [rotate, topic]);

  if (!topic) return null;

  const rotated = [...topic.images.slice(offset), ...topic.images.slice(0, offset)];
  const shown = [rotated[0], ...rotated.slice(1, 5)];
  const featured = shown[0];
  const tiles = shown.slice(1);
  const platformMeta = platforms.find(p => p.id === platform)!;
  const searchUrl = buildUrl(topic, platform);
  const display = buildDisplay(topic, platform);

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-5 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="text-sm font-bold uppercase tracking-wider text-red-400">{title}</span>
          <span className="text-sm text-zinc-500 hidden sm:inline">— curated from the open web &amp; social tags</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRotate(r => !r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              rotate
                ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50'
            }`}
          >
            {rotate ? '⏸ Auto-pause' : '▶ Auto-play'}
          </button>
          <button
            onClick={shuffle}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg hover:shadow-red-500/25 transition-all"
          >
            🔀 Surprise me
          </button>
        </div>
      </div>

      {/* Topic chips */}
      <div className="px-5 pt-4 flex gap-2 flex-wrap">
        {topics.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { setTopicIdx(i); setOffset(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              i === topicIdx
                ? 'bg-zinc-700 text-white'
                : 'bg-zinc-800/50 text-zinc-400 hover:text-white border border-zinc-700/50'
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Platform tabs + live query */}
      <div className="px-5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex gap-2">
          {platforms.map(p => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                platform === p.id
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                  : 'bg-zinc-800/50 text-zinc-400 hover:text-white border border-zinc-700/50'
              }`}
            >
              {p.icon} {p.label}
            </button>
          ))}
        </div>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 bg-cyan-500/5 border border-cyan-500/20 px-4 py-2 rounded-xl hover:bg-cyan-500/10 transition-all self-start sm:self-auto"
        >
          {platformMeta.hint}: <span className="text-white">{display}</span> ↗
        </a>
      </div>

      {/* Image grid */}
      <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-3">
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-[16/10] col-span-2 row-span-2 rounded-xl overflow-hidden bg-zinc-800"
        >
          <img
            src={featured}
            alt={`${topic.label} — live inspiration`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-white font-bold text-lg drop-shadow">{topic.emoji} {topic.label}</span>
            <span className="bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
              See live on {platformMeta.label} ↗
            </span>
          </div>
        </a>
        {tiles.map((img, i) => (
          <a
            key={`${offset}-${i}`}
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-800 hover:ring-2 hover:ring-red-500/40 transition-all"
          >
            <img
              src={img}
              alt={`${topic.label} inspiration ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-3 py-1 rounded-full">
                {platformMeta.icon} view more
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-5 pb-5 text-xs text-zinc-500 leading-relaxed">
        Tap any tile to open a <strong className="text-zinc-300">live {platformMeta.label} search</strong> for this topic. The wall
        auto-rotates fresh angles every few seconds — or hit <strong className="text-zinc-300">🔀 Surprise me</strong> to jump topics.
      </div>
    </div>
  );
}
