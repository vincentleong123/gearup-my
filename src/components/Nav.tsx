'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang, Lang } from '@/i18n/context';
import { withLang } from '@/lib/lang';

const links = [
  { href: '/#gear', key: 'nav.gear', label: 'Gear' },
  { href: '/gigs', key: 'nav.gigs', label: 'Gigs' },
  { href: '/compare', key: 'nav.compare', label: 'Compare' },
  { href: '/niche', key: 'nav.niches', label: 'Niches' },
  { href: '/blog', key: 'nav.blog', label: 'Reviews' },
  { href: '/security', key: 'nav.security', label: 'Security' },
  { href: '/hashtags', key: 'nav.hashtags', label: 'Hashtags' },
  { href: '/videos', key: 'nav.videos', label: 'Videos' },
  { href: '/glossary', key: 'nav.glossary', label: 'Glossary' },
  { href: '/#creators', key: 'nav.creators', label: 'Creators' },
  { href: '/#calculator', key: 'nav.roiCalc', label: 'ROI Calc' },
];

const primaryKeys = ['nav.gear', 'nav.gigs', 'nav.compare', 'nav.blog', 'nav.security'];

const defaultLabels: Record<string, string> = {
  'nav.gear': 'Gear',
  'nav.gigs': 'Gigs',
  'nav.compare': 'Compare',
  'nav.blog': 'Reviews',
  'nav.security': 'Security',
  'nav.hashtags': 'Hashtags',
  'nav.videos': 'Videos',
  'nav.creators': 'Creators',
  'nav.roiCalc': 'ROI Calc',
};

const LANGS: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'ms', label: 'BM' },
  { id: 'zh', label: '中文' },
];

function LangSwitch({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: (k: string, f: string) => string }) {
  return (
    <div
      role="group"
      aria-label={t('nav.langSwitch', 'Switch language')}
      className="flex items-center gap-0.5 rounded-lg border border-zinc-700 p-0.5"
    >
      {LANGS.map(l => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          className={`px-2.5 py-1.5 text-xs font-bold rounded-md transition-all ${
            lang === l.id
              ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
              : 'text-zinc-300 hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function Logo({ id = 'gubar-nav', lang }: { id?: string; lang: Lang }) {
  return (
    <Link href={withLang(lang, '/')} className="group flex items-center gap-2.5 font-black text-xl tracking-tight">
      <span className="relative grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-red-500 via-pink-600 to-fuchsia-600 shadow-lg shadow-pink-600/30 group-hover:shadow-pink-500/50 group-hover:-translate-y-0.5 transition-all duration-300">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#fbcfe8" />
            </linearGradient>
          </defs>
          <rect x="2.5" y="6.5" width="19" height="12.5" rx="3" stroke={`url(#${id})`} strokeWidth="1.7" />
          <circle cx="12" cy="12.5" r="3.6" stroke={`url(#${id})`} strokeWidth="1.7" />
          <path d="M8.5 6.5l1.1-2A1 1 0 0110.4 4h3.2a1 1 0 01.8.5l1.1 2" stroke={`url(#${id})`} strokeWidth="1.7" />
          <circle cx="17.2" cy="10.2" r="1.05" fill="#6ee7b7" />
        </svg>
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Kameralog</span>
        <span className="text-xs bg-gradient-to-r from-red-500 to-pink-600 text-white px-1.5 py-0.5 rounded-md font-bold">MY</span>
      </span>
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const navLinks = links.map(l => ({ ...l, href: withLang(lang, l.href) }));

  const isActive = (href: string) => {
    if (href.includes('#')) return pathname === withLang(lang, '/');
    return pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      <div className="relative bg-gradient-to-r from-red-600 via-pink-600 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] sm:text-xs font-semibold text-center py-1.5 tracking-wide truncate">
            <span className="hidden sm:inline">{t('nav.announce', "🇲🇾 Malaysia's Camera & Gear Review Journal for 2026 · Jobless? Your gear can pay for itself — niches, events & gigs that repay fast")}</span>
            <span className="sm:hidden">{t('nav.announce', "🇲🇾 Malaysia's Camera & Gear Review Journal 2026 · Gear that pays for itself")}</span>
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-zinc-900">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-pink-500 to-fuchsia-500 transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main bar */}
      <nav className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo lang={lang} />

            <div className="hidden xl:flex items-center gap-1">
              {navLinks.filter(l => primaryKeys.includes(l.key)).map(l => (
                <Link
                  key={l.key}
                  href={l.href}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive(l.href)
                      ? 'text-white bg-zinc-800/60'
                      : 'text-zinc-200 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  {t(l.key, defaultLabels[l.key] || l.label)}
                  {isActive(l.href) && (
                    <span className="absolute left-3 right-3 -bottom-[1px] h-0.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
                  )}
                </Link>
              ))}

              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(o => !o)}
                  aria-expanded={moreOpen}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                    moreOpen ? 'text-white bg-zinc-800/60' : 'text-zinc-200 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  {t('nav.more', 'More')}
                  <svg className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {moreOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl py-2 z-50 animate-fade-in">
                    {navLinks.filter(l => !primaryKeys.includes(l.key)).map(l => (
                      <Link
                        key={l.key}
                        href={l.href}
                        onClick={() => setMoreOpen(false)}
                        className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                          isActive(l.href) ? 'text-white bg-zinc-800/60' : 'text-zinc-200 hover:text-white hover:bg-zinc-800/50'
                        }`}
                      >
                        {t(l.key, defaultLabels[l.key] || l.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="hidden xl:flex items-center gap-2">
              <LangSwitch lang={lang} setLang={setLang} t={t} />
              <Link
                href={withLang(lang, '/quiz')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-pink-600/25 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>⚡</span> {t('nav.startHere', 'Start Here')}
              </Link>
            </div>

            {/* Mobile: lang + hamburger */}
            <div className="flex items-center gap-2 xl:hidden">
              <LangSwitch lang={lang} setLang={setLang} t={t} />
              <button
                onClick={() => setOpen(!open)}
                className="p-2 text-zinc-100 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-all"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="xl:hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(l => (
                <Link
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                    isActive(l.href) ? 'text-white bg-zinc-800/60' : 'text-zinc-200 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {t(l.key, defaultLabels[l.key] || l.label)}
                </Link>
              ))}
              <Link
                href={withLang(lang, '/quiz')}
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg shadow-pink-600/25"
              >
                <span>⚡</span> {t('nav.startHereMobile', 'Start Here — Gear Match Quiz')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
