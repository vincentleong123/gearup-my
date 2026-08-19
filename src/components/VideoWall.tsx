'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { videos, videoCategories, youtubeThumb, youtubeEmbed } from '@/data/videos';
import type { VideoCategory, VideoItem } from '@/data/videos';
import { instagramPosts, instagramCategories, instagramEmbedUrl } from '@/data/instagramPosts';
import type { InstagramCategory, InstagramPost } from '@/data/instagramPosts';
import { igThumb } from '@/data/instagram';

type Source = 'all' | 'youtube' | 'instagram';

type FeedItem =
  | ({ kind: 'youtube' } & VideoItem)
  | ({ kind: 'instagram' } & InstagramPost);

const levelBadge: Record<VideoItem['level'], { label: string; cls: string }> = {
  beginner: { label: 'Beginner', cls: 'bg-green-500/10 text-green-400 border-green-500/30' },
  intermediate: { label: 'Intermediate', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  advanced: { label: 'Advanced', cls: 'bg-red-500/10 text-red-400 border-red-500/30' },
};

const sources: { id: Source; label: string; emoji: string }[] = [
  { id: 'all', label: 'Everything', emoji: '🎬' },
  { id: 'youtube', label: 'Tutorials', emoji: '▶️' },
  { id: 'instagram', label: 'Saved Gear Posts', emoji: '📌' },
];

function CategoryPills({
  cats,
  active,
  onSelect,
}: {
  cats: { id: string; label: string; emoji: string }[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {cats.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
            active === cat.id
              ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-transparent shadow-lg shadow-pink-600/25'
              : 'bg-white/5 text-zinc-200 border-white/10 hover:text-white hover:border-red-500/40 hover:bg-white/10'
          }`}
        >
          <span>{cat.emoji}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default function VideoWall({ limit }: { limit?: number }) {
  const [source, setSource] = useState<Source>('all');
  const [youtubeCat, setYoutubeCat] = useState<VideoCategory | 'all'>('all');
  const [igCat, setIgCat] = useState<InstagramCategory | 'all'>('all');
  const [playing, setPlaying] = useState<FeedItem | null>(null);

  const feed = useMemo<FeedItem[]>(() => {
    const list: FeedItem[] = [
      ...videos.map(v => ({ ...v, kind: 'youtube' as const })),
      ...instagramPosts.map(p => ({ ...p, kind: 'instagram' as const })),
    ];
    return limit ? list.slice(0, limit) : list;
  }, [limit]);

  const filtered = useMemo(() => {
    let list = feed;
    if (source === 'youtube') list = list.filter(i => i.kind === 'youtube');
    if (source === 'instagram') list = list.filter(i => i.kind === 'instagram');
    if (source === 'youtube' && youtubeCat !== 'all') list = list.filter(i => i.kind === 'youtube' && i.category === youtubeCat);
    if (source === 'instagram' && igCat !== 'all') list = list.filter(i => i.kind === 'instagram' && i.category === igCat);
    return list;
  }, [feed, source, youtubeCat, igCat]);

  const close = useCallback(() => setPlaying(null), []);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [playing, close]);

  return (
    <div>
      {/* Source toggle */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {sources.map(s => (
          <button
            key={s.id}
            onClick={() => setSource(s.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              source === s.id
                ? 'bg-white text-zinc-950 border-transparent shadow-lg shadow-zinc-500/10'
                : 'bg-white/5 text-zinc-200 border-white/10 hover:text-white hover:border-white/30 hover:bg-white/10'
            }`}
          >
            <span>{s.emoji}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Category filter pills (per source) */}
      <div className="mb-10">
        {source === 'youtube' && <CategoryPills cats={videoCategories} active={youtubeCat} onSelect={id => setYoutubeCat(id as VideoCategory | 'all')} />}
        {source === 'instagram' && <CategoryPills cats={instagramCategories} active={igCat} onSelect={id => setIgCat(id as InstagramCategory | 'all')} />}
        {source === 'all' && (
          <p className="text-center text-xs text-zinc-500 uppercase tracking-[0.3em]">
            Mixing {videos.length} tutorials + {instagramPosts.length} saved gear posts
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(item =>
          item.kind === 'youtube' ? (
            <button
              key={item.id}
              onClick={() => setPlaying(item)}
              className="group text-left bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-600/5 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden bg-zinc-900">
                <img
                  src={youtubeThumb(item.youtubeId)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid place-items-center h-14 w-14 rounded-full bg-white/10 backdrop-blur border border-white/25 group-hover:bg-red-500 group-hover:border-red-400 group-hover:scale-110 transition-all duration-300">
                    <svg className="h-5 w-5 text-white translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                {item.duration && (
                  <span className="absolute bottom-2 right-2 text-[11px] font-bold px-1.5 py-0.5 rounded bg-zinc-950/80 border border-white/15 text-white">
                    {item.duration}
                  </span>
                )}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${levelBadge[item.level].cls}`}>
                    {levelBadge[item.level].label}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm leading-snug group-hover:text-red-400 transition-colors mb-1.5 line-clamp-2">{item.title}</h3>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5 truncate pr-2">
                    <span className="shrink-0 grid place-items-center h-5 w-5 rounded-full bg-zinc-800 text-[9px] font-bold text-zinc-100">{item.channel[0]}</span>
                    <span className="truncate">{item.channel}</span>
                  </span>
                  {item.views && <span className="shrink-0">{item.views} views</span>}
                </div>
              </div>
            </button>
          ) : (
            <button
              key={item.id}
              onClick={() => setPlaying(item)}
              className="group text-left bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-pink-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-600/5 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-900">
                <img
                  src={igThumb(item.shortcode)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/20" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid place-items-center h-14 w-14 rounded-full bg-white/10 backdrop-blur border border-white/25 group-hover:bg-pink-500 group-hover:border-pink-400 group-hover:scale-110 transition-all duration-300">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.5A9.5 9.5 0 1021.5 12 9.51 9.51 0 0012 2.5zM17 15.5a.9.9 0 01-.9.9H7.9a.9.9 0 01-.9-.9v-7a.9.9 0 01.9-.9h8.2a.9.9 0 01.9.9z" />
                    </svg>
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider bg-pink-500/10 text-pink-300 border-pink-500/30">
                    {item.isVideo ? 'Reel' : 'Post'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm leading-snug group-hover:text-pink-400 transition-colors mb-1.5 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-zinc-500 line-clamp-2 mb-2">{item.caption}</p>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="shrink-0 grid place-items-center h-5 w-5 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 text-[9px] font-bold text-white">{item.author[0]}</span>
                    <span className="truncate">{item.author}</span>
                  </span>
                  <span className="shrink-0 text-pink-400/70">Instagram</span>
                </div>
              </div>
            </button>
          )
        )}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-zinc-500 py-16">Nothing here yet — check back soon.</p>
      )}

      {/* Lightbox player */}
      {playing && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center p-4 sm:p-8 pt-16 sm:pt-20 bg-zinc-950/90 backdrop-blur-sm animate-fade-in overflow-y-auto"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={playing.title}
        >
          <button
            onClick={close}
            className="sticky top-0 float-right -mt-2 z-10 grid place-items-center h-10 w-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-red-500 hover:border-red-400 transition-all"
            aria-label="Close video"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="w-full max-w-4xl mx-auto" onClick={e => e.stopPropagation()}>
            {playing.kind === 'youtube' ? (
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-pink-600/10 bg-black">
                <iframe
                  src={youtubeEmbed(playing.youtubeId)}
                  title={playing.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-pink-600/10 bg-white flex justify-center">
                <iframe
                  src={instagramEmbedUrl(playing.shortcode)}
                  title={playing.title}
                  className="block w-full max-w-[540px] min-h-[640px] border-0"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            )}
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">{playing.title}</h3>
                <p className="text-sm text-zinc-200 mt-1">
                  {playing.kind === 'youtube' ? playing.channel : `${playing.author} · saved post`}
                </p>
                {playing.kind === 'instagram' && playing.caption && (
                  <p className="text-sm text-zinc-500 mt-2 max-w-2xl">{playing.caption}</p>
                )}
              </div>
              <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-zinc-100">
                {playing.kind === 'youtube' ? '▶ YouTube' : '📌 Instagram'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
