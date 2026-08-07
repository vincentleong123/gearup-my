'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/i18n/context';

const links = [
  { href: '/#gear', key: 'nav.gear', label: 'Gear' },
  { href: '/gigs', key: 'nav.gigs', label: 'Gigs' },
  { href: '/compare', key: 'nav.compare', label: 'Compare' },
  { href: '/blog', key: 'nav.blog', label: 'Reviews' },
  { href: '/#creators', key: 'nav.creators', label: 'Creators' },
  { href: '/#calculator', key: 'nav.roiCalc', label: 'ROI Calc' },
];

const defaultLabels: Record<string, string> = {
  'nav.gear': 'Gear',
  'nav.gigs': 'Gigs',
  'nav.compare': 'Compare',
  'nav.blog': 'Reviews',
  'nav.creators': 'Creators',
  'nav.roiCalc': 'ROI Calc',
};

function Logo({ id = 'gubar-nav' }: { id?: string }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5 font-black text-xl tracking-tight">
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

  const isActive = (href: string) => {
    if (href.includes('#')) return pathname === '/';
    return pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      <div className="relative bg-gradient-to-r from-red-600 via-pink-600 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] sm:text-xs font-semibold text-center py-1.5 tracking-wide truncate">
            🇲🇾 Malaysia&apos;s #1 Camera &amp; Gear Review Site for 2026 &nbsp;·&nbsp; Second-hand prices updated Aug 2026
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
            <Logo />

            <div className="hidden lg:flex items-center gap-1">
              {links.map(l => (
                <Link
                  key={l.key}
                  href={l.href}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive(l.href)
                      ? 'text-white bg-zinc-800/60'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  {t(l.key, defaultLabels[l.key] || l.label)}
                  {isActive(l.href) && (
                    <span className="absolute left-3 right-3 -bottom-[1px] h-0.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setLang(lang === 'ms' ? 'en' : 'ms')}
                className="px-3 py-2 text-xs font-bold rounded-lg border border-zinc-700 hover:border-red-500/50 hover:text-red-400 transition-all uppercase tracking-wider"
                aria-label="Switch language"
              >
                {lang === 'ms' ? 'EN' : 'BM'}
              </button>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-pink-600/25 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>⚡</span> Start Here
              </Link>
            </div>

            {/* Mobile: lang + hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setLang(lang === 'ms' ? 'en' : 'ms')}
                className="px-2 py-1 text-xs font-bold rounded-lg border border-zinc-700 hover:border-red-500/50 transition-all uppercase tracking-wider"
                aria-label="Switch language"
              >
                {lang === 'ms' ? 'EN' : 'BM'}
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-all"
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
          <div className="lg:hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {links.map(l => (
                <Link
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                    isActive(l.href) ? 'text-white bg-zinc-800/60' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {t(l.key, defaultLabels[l.key] || l.label)}
                </Link>
              ))}
              <Link
                href="/quiz"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg shadow-pink-600/25"
              >
                <span>⚡</span> Start Here — Gear Match Quiz
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
