'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { blogImg } from '@/data/images';
import { useLang } from '@/i18n/context';
import { withLang } from '@/lib/lang';

const realLang = (a: { lang?: 'ms' | 'zh' }) => a.lang ?? 'en';

const categoryColors: Record<string, string> = {
  guide: 'bg-green-500/20 text-green-400 border-green-500/30',
  comparison: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  gear: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  inspiration: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

const filters = [
  { id: 'all', label: 'All' },
  { id: 'guide', label: 'Guides' },
  { id: 'comparison', label: 'Comparisons' },
  { id: 'gear', label: 'Gear' },
  { id: 'inspiration', label: 'Inspiration' },
] as const;

type FilterId = (typeof filters)[number]['id'];

const langFilters = [
  { id: 'all', label: 'All Languages' },
  { id: 'ms', label: 'Bahasa Melayu' },
  { id: 'en', label: 'English' },
  { id: 'zh', label: '中文' },
] as const;

type LangFilterId = (typeof langFilters)[number]['id'];

const langBadge = (lang?: 'ms' | 'zh') =>
  lang === 'ms'
    ? 'bg-red-500/20 text-red-400 border-red-500/30'
    : lang === 'zh'
    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
    : 'bg-zinc-700/40 text-zinc-300 border-zinc-600/40';

const langLabel = (lang: 'ms' | 'zh' | undefined, t: (k: string, f: string) => string) =>
  lang === 'ms' ? t('blog.langFilter.ms', 'Bahasa Melayu') : lang === 'zh' ? t('blog.langFilter.zh', '中文') : t('blog.langFilter.en', 'English');

export default function BlogList() {
  const { t, lang: routeLang } = useLang();
  const [filter, setFilter] = useState<FilterId>('all');
  const [lang, setLang] = useState<LangFilterId>('all');

  const sorted = useMemo(() => [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)), []);
  const list = useMemo(
    () =>
      sorted.filter(a => {
        const catOk = filter === 'all' || a.category === filter;
        const langOk = lang === 'all' || (a.lang ?? 'en') === lang;
        return catOk && langOk;
      }),
    [filter, lang, sorted]
  );

  const [featured, ...rest] = list;

  const filterLabels: Record<FilterId, string> = {
    all: t('blog.filter.all', 'All'),
    guide: t('blog.filter.guides', 'Guides'),
    comparison: t('blog.filter.comparisons', 'Comparisons'),
    gear: t('blog.filter.gear', 'Gear'),
    inspiration: t('blog.filter.inspiration', 'Inspiration'),
  };

  const langFilterLabels: Record<LangFilterId, string> = {
    all: t('blog.langFilter.all', 'All Languages'),
    ms: t('blog.langFilter.ms', 'Bahasa Melayu'),
    en: t('blog.langFilter.en', 'English'),
    zh: t('blog.langFilter.zh', '中文'),
  };

  return (
    <>
      {/* Filters */}
      <div className="flex justify-center gap-2 flex-wrap mb-4">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              filter === f.id
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-zinc-950 shadow-lg shadow-green-500/25'
                : 'bg-zinc-800/50 text-zinc-200 hover:text-white border border-zinc-700/50'
            }`}
          >
            {filterLabels[f.id]}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-2 flex-wrap mb-10">
        {langFilters.map(f => (
          <button
            key={f.id}
            onClick={() => setLang(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              lang === f.id
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-zinc-950 shadow-lg shadow-red-500/25'
                : 'bg-zinc-800/50 text-zinc-200 hover:text-white border border-zinc-700/50'
            }`}
          >
            {langFilterLabels[f.id]}
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured && (
        <Link
          href={withLang(realLang(featured), `/blog/${featured.slug}`)}
          className="group relative block bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden mb-8 hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-600/10 transition-all duration-300"
        >
          <div className="h-64 md:h-96 relative overflow-hidden bg-zinc-900">
            <img
              src={blogImg(featured.slug)}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500 text-zinc-950 uppercase">{t('blog.featured', 'Featured')}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase backdrop-blur-sm ${categoryColors[featured.category]}`}>{featured.category}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase backdrop-blur-sm ${langBadge(featured.lang)}`}>{langLabel(featured.lang, t)}</span>
            </div>
          </div>
          <div className="p-6 md:p-10 -mt-24 relative z-10">
            <div className="flex items-center gap-3 text-sm text-zinc-200 mb-3">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime} {t('common.minRead', 'min read')}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black group-hover:text-green-400 transition-colors mb-3 max-w-2xl">{featured.title}</h2>
            <p className="text-zinc-100 max-w-2xl leading-relaxed text-lg">{featured.description}</p>
          </div>
        </Link>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map(a => (
          <Link
            key={a.slug}
            href={withLang(realLang(a), `/blog/${a.slug}`)}
            className="group block bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-green-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-600/5 transition-all duration-300"
          >
            <div className="h-44 relative overflow-hidden bg-zinc-900">
              <img
                src={blogImg(a.slug)}
                alt={a.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase backdrop-blur-sm ${categoryColors[a.category]}`}>{a.category}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase backdrop-blur-sm ${langBadge(a.lang)}`}>{a.lang === 'ms' ? 'BM' : a.lang === 'zh' ? '中文' : 'EN'}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2 text-xs text-zinc-500">
                <span>{a.date}</span>
                <span>·</span>
                <span>{a.readTime} {t('common.minRead', 'min read')}</span>
              </div>
              <h2 className="text-lg font-bold group-hover:text-green-400 transition-colors mb-2 line-clamp-2">{a.title}</h2>
              <p className="text-zinc-200 text-sm line-clamp-2 mb-3">{a.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {a.tags.slice(0, 3).map(t => (
                  <span key={t} className="text-[11px] text-zinc-500 bg-zinc-800/60 px-2 py-0.5 rounded-full">#{t}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {rest.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-zinc-200 font-semibold">{t('blog.noArticles', 'No articles in this category yet. New ones drop every week.')}</p>
        </div>
      )}

      <div className="mt-14 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl px-6 py-5">
          <span className="text-2xl">📬</span>
          <p className="text-sm text-zinc-200">
            <strong className="text-white">{t('blog.cta.title', 'New review every week.')}</strong>{' '}
            {t('blog.cta.desc', 'Get the 2026 Gear Guide + price drop alerts free.')}
          </p>
          <Link
            href={withLang(routeLang, '/#gear')}
            className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-zinc-950 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all"
          >
            {t('blog.cta.browse', 'Browse Gear')} →
          </Link>
        </div>
      </div>
    </>
  );
}
