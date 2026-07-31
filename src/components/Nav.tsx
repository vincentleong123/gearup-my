'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/i18n/context';

const links = [
  { href: '/#gear', key: 'nav.gear' },
  { href: '/compare', key: 'nav.compare' },
  { href: '/quiz', key: 'nav.quiz' },
  { href: '/niche', key: 'nav.niches' },
  { href: '/#creators', key: 'nav.creators' },
  { href: '/#calculator', key: 'nav.roiCalc' },
  { href: '/blog', key: 'nav.blog' },
  { href: '/glossary', key: 'nav.glossary' },
];

const defaultLabels: Record<string, string> = {
  'nav.gear': 'Gear',
  'nav.compare': 'Compare',
  'nav.quiz': 'Quiz',
  'nav.niches': 'Niches',
  'nav.creators': 'Creators',
  'nav.roiCalc': 'ROI Calc',
  'nav.blog': 'Blog',
  'nav.glossary': 'Glossary',
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-black text-xl">
            <span>📸</span>
            <span>GearUp</span>
            <span className="text-xs bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-0.5 rounded-md font-bold">MY</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="px-4 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/50 transition-all font-medium">
                {t(l.key, defaultLabels[l.key])}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === 'ms' ? 'en' : 'ms')}
              className="ml-3 px-3 py-1.5 text-xs font-bold rounded-lg border border-zinc-700 hover:border-red-500/50 hover:text-red-400 transition-all uppercase tracking-wider"
              aria-label="Switch language"
            >
              {lang === 'ms' ? 'EN' : 'BM'}
            </button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLang(lang === 'ms' ? 'en' : 'ms')}
              className="px-2 py-1 text-xs font-bold rounded-lg border border-zinc-700 hover:border-red-500/50 transition-all uppercase tracking-wider"
              aria-label="Switch language"
            >
              {lang === 'ms' ? 'EN' : 'BM'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-zinc-400 hover:text-white"
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
      {open && (
        <div className="md:hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/50 transition-all font-medium">
                {t(l.key, defaultLabels[l.key])}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
