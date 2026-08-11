'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { hashtagPosts, hashCategories, allGearHashtags, gearForPost, HashCategory } from '@/data/hashtagPosts';
import { getPayoffPath } from '@/data/gigs';
import { useLang } from '@/i18n/context';
import { withLang } from '@/lib/lang';

const categoryEmoji: Record<string, string> = {
  phone: '📱',
  camera: '📷',
  action: '🎥',
  drone: '🚁',
  audio: '🎙️',
  technique: '🎯',
};

export default function HashtagGlossary() {
  const { lang } = useLang();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<HashCategory | 'all'>('all');
  const [activeTag, setActiveTag] = useState<string>('');

  const allTags = useMemo(() => allGearHashtags(), []);
  const primaryTags = useMemo(() => {
    // One primary hashtag per gear model (the first entry), for a clean chip rail
    const seen = new Set<string>();
    const out: { tag: string; gearName: string; gearSlug: string }[] = [];
    for (const t of allTags) {
      if (seen.has(t.tag.toUpperCase())) continue;
      seen.add(t.tag.toUpperCase());
      out.push(t);
    }
    return out;
  }, [allTags]);

  // Deep-link support: /hashtags#IPHONE17PRO
  useEffect(() => {
    const raw = window.location.hash.replace('#', '').trim();
    if (raw) setActiveTag(raw.toUpperCase());
  }, []);

  const filtered = useMemo(() => {
    let list = hashtagPosts;
    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (activeTag) {
      const tagLower = activeTag.replace('#', '').toLowerCase();
      list = list.filter(p => p.hashtag.toLowerCase() === tagLower || p.gearSlug.toLowerCase().includes(tagLower));
    } else if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.hashtag.toLowerCase().includes(q) ||
        p.caption.toLowerCase().includes(q) ||
        p.settings.join(' ').toLowerCase().includes(q)
      );
    }
    return list;
  }, [cat, activeTag, query]);

  const matchedTags = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return allTags.filter(t => t.tag.toLowerCase().includes(q) || t.gearName.toLowerCase().includes(q)).slice(0, 8);
  }, [query, allTags]);

  const selectTag = (tag: string) => {
    const clean = tag.replace('#', '').trim().toUpperCase();
    setActiveTag(clean);
    setQuery('');
    window.history.replaceState(null, '', `#${clean}`);
  };

  const clearTag = () => {
    setActiveTag('');
    setQuery('');
    window.history.replaceState(null, '', window.location.pathname);
  };

  return (
    <div>
      {/* Search */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="flex items-center gap-2 bg-zinc-900/70 border border-zinc-700/60 rounded-2xl px-4 py-3 focus-within:border-pink-500/50 transition-colors">
          <span className="text-lg">🔍</span>
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); if (activeTag) clearTag(); }}
            placeholder='Search hashtags like "DJIOSMO" or "IPHONE17PRO"…'
            className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 outline-none text-sm"
          />
          {activeTag && (
            <button onClick={clearTag} className="text-xs font-bold text-pink-400 hover:text-pink-300">
              Clear
            </button>
          )}
        </div>
        {matchedTags.length > 0 && (
          <div className="absolute z-20 mt-2 w-full bg-zinc-900 border border-zinc-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            {matchedTags.map(t => (
              <button
                key={t.tag}
                onClick={() => selectTag(t.tag)}
                className="w-full text-left px-4 py-3 hover:bg-zinc-800/60 transition-colors flex items-center justify-between gap-3"
              >
                <span className="font-bold text-cyan-300 text-sm">#{t.tag}</span>
                <span className="text-xs text-zinc-500">{t.gearName}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {hashCategories.map(c => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              cat === c.id
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-transparent shadow-lg shadow-pink-600/25'
                : 'bg-white/5 text-zinc-200 border-white/10 hover:text-white hover:border-pink-500/40 hover:bg-white/10'
            }`}
          >
            <span>{c.emoji}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Selected hashtag banner */}
      {activeTag && (
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-5 py-2">
            <span className="text-2xl font-black text-cyan-300">#{activeTag}</span>
            <button onClick={clearTag} className="text-xs font-bold text-zinc-400 hover:text-white ml-2">
              ✕ clear
            </button>
          </div>
          <p className="text-sm text-zinc-500 mt-3">
            Curated on-site posts for this hashtag — settings, gear, and how many gigs to pay it off.
          </p>
        </div>
      )}

      {/* Hashtag chip rail (all primary tags) */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {primaryTags.slice(0, 40).map(t => (
          <button
            key={t.tag}
            onClick={() => selectTag(t.tag)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              activeTag === t.tag.toUpperCase()
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                : 'bg-zinc-800/50 text-zinc-200 hover:text-white border-zinc-700/50 hover:border-pink-500/40'
            }`}
          >
            #{t.tag}
          </button>
        ))}
      </div>

      {/* Curated posts grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(post => {
          const gear = gearForPost(post);
          const paths = gear ? getPayoffPath(gear) : [];
          const best = paths[0];
          return (
            <article key={post.id} className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-pink-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-600/5 transition-all duration-300 flex flex-col">
              <Link href={withLang(lang, `/gear/${post.gearSlug}`)} className="block relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent" />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider bg-pink-500/10 text-pink-300 border-pink-500/30">
                    {categoryEmoji[post.category]} {post.category}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-cyan-300 drop-shadow bg-black/40 px-2 py-0.5 rounded-full">#{post.hashtag}</span>
                  <span className="text-xs font-bold text-white bg-black/40 px-2 py-0.5 rounded-full">Read review ↗</span>
                </div>
              </Link>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-base leading-snug group-hover:text-pink-400 transition-colors mb-2">{post.title}</h3>
                <p className="text-sm text-zinc-200 mb-4">{post.caption}</p>

                <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-4 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-2">⚙️ Settings recipe</div>
                  <ul className="space-y-1.5">
                    {post.settings.map((s, i) => (
                      <li key={i} className="text-xs text-zinc-200 flex gap-2">
                        <span className="text-pink-400 shrink-0">›</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-zinc-500 mb-4">
                  <span className="font-bold text-amber-400">💡 {post.tip}</span>
                </div>

                {/* Pay-off strip */}
                {gear && (
                  <div className="mt-auto bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                    {best ? (
                      <>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">💰 Pay it off</div>
                        <div className="text-xs text-zinc-200">
                          <Link href={withLang(lang, `/gigs/${best.gig.slug}`)} className="font-bold text-amber-400 hover:text-amber-300">
                            {best.minGigs === best.maxGigs ? best.minGigs : `${best.minGigs}-${best.maxGigs}`}
                          </Link>{' '}
                          <span className="text-zinc-300">{best.gig.title}</span>
                          <span className="text-zinc-500"> to own the {gear.name}</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-zinc-300">
                        <span className="font-bold text-amber-400">💰</span> Already in your pocket — pure profit.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-zinc-500 py-16">
          No curated posts yet for "{query || activeTag}". Try another hashtag or category.
        </p>
      )}

      {/* All hashtags glossary strip */}
      <div className="mt-14 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xl font-black mb-1">🏷️ Full Hashtag Glossary</h2>
        <p className="text-sm text-zinc-200 mb-4">
          Every gear hashtag this site curates — tap any to see its on-site posts and pay-off math.
        </p>
        <div className="flex flex-wrap gap-2">
          {allTags.map(t => (
            <button
              key={`${t.tag}-${t.gearSlug}`}
              onClick={() => selectTag(t.tag)}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-cyan-300 hover:border-pink-500/40 hover:text-white transition-all"
              title={t.gearName}
            >
              #{t.tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
