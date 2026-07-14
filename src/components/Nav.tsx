'use client';

import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '/#gear', label: 'Gear' },
  { href: '/#creators', label: 'Creators' },
  { href: '/#calculator', label: 'ROI Calc' },
  { href: '/blog', label: 'Blog' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

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
                {l.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
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
      {open && (
        <div className="md:hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/50 transition-all font-medium">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
