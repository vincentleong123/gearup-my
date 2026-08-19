'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { igPosts, igThumb, igEmbed, igPermalink, IgPost } from '@/data/instagram';
import { videoCategories } from '@/data/videos';
import type { VideoCategory } from '@/data/videos';

function Avatar({ post, size = 'h-8 w-8' }: { post: IgPost; size?: string }) {
  return (
    <span className={`relative inline-grid place-items-center shrink-0 ${size}`}>
      <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,#f9ce34,#ee2a7b,#6228d7,#ee2a7b,#f9ce34)]" />
      <span className={`relative rounded-full bg-zinc-900 grid place-items-center text-xs font-bold text-white ${size === 'h-8 w-8' ? 'h-7 w-7' : ''}`}>
        {post.username[0].toUpperCase()}
      </span>
    </span>
  );
}

export default function InstagramWall({ limit }: { limit?: number }) {
  const [active, setActive] = useState<VideoCategory | 'all'>('all');
  const [playing, setPlaying] = useState<IgPost | null>(null);

  const categories = useMemo(
    () =>
      [...new Set(igPosts.map(p => p.category))].sort((a, b) => a.localeCompare(b)),
    []
  );

  const filtered = useMemo(() => {
    const list = active === 'all' ? igPosts : igPosts.filter(p => p.category === active);
    return limit ? list.slice(0, limit) : list;
  }, [active, limit]);

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
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setActive('all')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
            active === 'all'
              ? 'bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white border-transparent shadow-lg shadow-pink-600/25'
              : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:border-pink-500/40 hover:bg-white/10'
          }`}
        >
          <span>📸</span> All Posts
        </button>
        {categories.map(cat => {
          const c = videoCategories.find(v => v.id === cat);
          return (
            <button
              key={cat}
              onClick={() => setActive(active === cat ? 'all' : cat)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                active === cat
                  ? 'bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white border-transparent shadow-lg shadow-pink-600/25'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:border-pink-500/40 hover:bg-white/10'
              }`}
            >
              <span>{c?.emoji}</span> {c?.label}
            </button>
          );
        })}
      </div>

      {/* Instagram wrapper cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(p => (
          <button
            key={p.id}
            onClick={() => setPlaying(p)}
            className="group text-left bg-[#0d0d0f] border border-zinc-800 rounded-2xl overflow-hidden hover:border-pink-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-600/5 transition-all duration-300"
          >
            {/* IG header — username + verified */}
            <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-zinc-800/60">
              <Avatar post={p} />
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-sm font-bold text-white">
                  <span className="truncate">{p.username}</span>
                  <span className="hidden sm:block text-zinc-500 font-normal truncate">· {p.author}</span>
                </div>
                <div className="text-[11px] text-zinc-500">{p.date}</div>
              </div>
              <svg className="ml-auto h-4 w-4 text-zinc-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="1.6" />
                <circle cx="12" cy="12" r="1.6" />
                <circle cx="19" cy="12" r="1.6" />
              </svg>
            </div>

            {/* Post image */}
            <div className="relative aspect-square overflow-hidden bg-zinc-900">
              <img
                src={igThumb(p.shortcode)}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid place-items-center h-12 w-12 rounded-full bg-white/15 backdrop-blur border border-white/30 group-hover:bg-pink-600 group-hover:border-pink-500 group-hover:scale-110 transition-all duration-300">
                  <svg className="h-5 w-5 text-white translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
              <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-950/70 backdrop-blur border border-white/15 text-[10px] font-bold text-white">
                <svg className="h-3 w-3 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M8.6 3.5A3 3 0 0111.4 2h1.2a3 3 0 012.8 1.5l.5.8a3 3 0 002.6 1.5h.9a3 3 0 013 3v1.5c.1 1.1.6 2.1 1.4 2.8l.6.5a3 3 0 010 4.5l-.6.5a3.9 3.9 0 00-1.4 2.8V23a3 3 0 01-3 3h-.9a3 3 0 00-2.6 1.5l-.5.8a3 3 0 01-2.8 1.5h-1.2a3 3 0 01-2.8-1.5l-.5-.8a3 3 0 00-2.6-1.5h-.9a3 3 0 01-3-3v-1.5c0-1.1-.5-2.1-1.4-2.8l-.6-.5a3 3 0 010-4.5l.6-.5c.9-.7 1.4-1.7 1.4-2.8V8a3 3 0 013-3h.9a3 3 0 002.6-1.5l.5-.8zM12 17.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0-2a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" clipRule="evenodd" />
                </svg>
                Post
              </span>
            </div>

            {/* IG actions */}
            <div className="px-3.5 pt-3 flex items-center gap-4 text-white">
              <svg className="h-6 w-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5c0-6 8-6 8 0V21M4 10.5v8A2.5 2.5 0 006.5 21h11a2.5 2.5 0 002.5-2.5v-8M4 10.5a4.5 4.5 0 014-4.47M20 10.5a4.5 4.5 0 00-4-4.47" />
              </svg>
              <svg className="ml-auto h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M12 4l8 8-8 8" />
              </svg>
            </div>

            {/* Likes + caption */}
            <div className="px-3.5 py-3 text-left">
              <div className="text-sm font-bold text-white mb-1">{p.likes} likes</div>
              <p className="text-sm text-zinc-300 leading-snug line-clamp-2">
                <span className="font-bold text-white">{p.username}</span>{' '}
                {p.description}
              </p>
              <div className="text-xs text-zinc-600 mt-1.5 font-semibold tracking-wide uppercase">View on Instagram →</div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-zinc-500 py-16">No posts in this category yet — check back soon.</p>
      )}

      {/* Lightbox — real Instagram embed (genuine wrapper = trust) */}
      {playing && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8 bg-zinc-950/90 backdrop-blur-sm animate-fade-in"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={playing.title}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 grid place-items-center h-10 w-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-pink-600 hover:border-pink-400 transition-all"
            aria-label="Close post"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-pink-600/10 bg-[#0d0d0f]">
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-800">
                <Avatar post={playing} />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-sm font-bold text-white">
                    <span className="truncate">{playing.username}</span>
                  </div>
                  <div className="text-[11px] text-zinc-500">{playing.date}</div>
                </div>
              </div>
              <div className="relative aspect-square bg-zinc-900">
                <iframe
                  src={igEmbed(playing.shortcode)}
                  title={playing.title}
                  className="absolute inset-0 w-full h-full"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  scrolling="no"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-white line-clamp-1">{playing.title}</h3>
              <a
                href={igPermalink(playing.shortcode)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white text-sm font-bold rounded-full hover:shadow-lg hover:shadow-pink-600/25 transition-all"
              >
                Follow on Instagram ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
