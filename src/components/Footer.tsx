'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/context';

const socials = [
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12c0 1.9.2 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.9.5-3.9.5-5.8s-.2-3.9-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.9.4-.4.2-.8.4-1.1.7-.3.3-.5.7-.7 1.1-.2.4-.3.8-.4 1.9-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.4 1.9.2.4.4.8.7 1.1.3.3.7.5 1.1.7.4.2.8.3 1.9.4 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.9-.4.4-.2.8-.4 1.1-.7.3-.3.5-.7.7-1.1.2-.4.3-.8.4-1.9.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.4-1.9a3 3 0 0 0-.7-1.1 3 3 0 0 0-1.1-.7c-.4-.2-.8-.3-1.9-.4-1.3-.1-1.7-.1-4.8-.1zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm5.2-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <path d="M12.5 2h3.1c.2 1.5.9 3.5 2.9 4.6.9.5 1.9.7 3 .7v3.1c-1.4 0-2.7-.4-4-1.1v7.1a6.9 6.9 0 1 1-6.9-6.9c.3 0 .6 0 .9.1v3.2a3.8 3.8 0 1 0 2.7 3.6V2h1.3z" />
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05v-2.66c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    ),
  },
];

function Logo({ id = 'gubar-foot' }: { id?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-black text-lg tracking-tight">
      <span className="relative grid place-items-center h-8 w-8 rounded-xl bg-gradient-to-br from-red-500 via-pink-600 to-fuchsia-600 shadow-lg shadow-pink-600/30">
        <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5 text-white">
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
        <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">GearUp</span>
        <span className="text-xs bg-gradient-to-r from-red-500 to-pink-600 text-white px-1.5 py-0.5 rounded-md font-bold">MY</span>
      </span>
    </Link>
  );
}

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-600/[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        {/* Newsletter */}
        <div className="gradient-border rounded-3xl bg-zinc-900/70 p-8 md:p-10 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-black mb-2">
                Get the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-fuchsia-500">2026 Gear Guide</span> free
              </h3>
              <p className="text-zinc-400 text-sm md:text-base">
                One email a month. New reviews, second-hand price drops, and gig ideas for Malaysian creators. No spam, unsubscribe anytime.
              </p>
            </div>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                aria-label="Email address"
                className="flex-1 bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-600/25 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              >
                Subscribe →
              </button>
            </form>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8 pt-6 border-t border-zinc-800/60 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5"><span>🇲🇾</span> Malaysian prices in MYR</span>
            <span className="inline-flex items-center gap-1.5"><span>🆕</span> 2026 Edition — updated Aug 2026</span>
            <span className="inline-flex items-center gap-1.5"><span>🔒</span> No spam, ever</span>
            <span className="inline-flex items-center gap-1.5"><span>⭐</span> Rated 4.9/5 by readers</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <Logo />
            <p className="text-zinc-400 text-sm leading-relaxed mt-4">
              {t('footer.tagline', 'Helping Malaysian creators find gear that pays for itself. Real reviews, real prices, real earnings.')}
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid place-items-center h-9 w-9 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-400 hover:text-white hover:border-pink-500/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider">{t('footer.explore', 'Explore')}</h4>
            <div className="space-y-2">
              <Link href="/#gear" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.gear', 'Gear Reviews')}</Link>
              <Link href="/gigs" className="block text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium">{t('nav.gigs', 'Gigs That Pay For Your Gear')}</Link>
              <Link href="/compare" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.compare', 'Compare Gear')}</Link>
              <Link href="/quiz" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.quiz', 'Gear Match Quiz')}</Link>
              <Link href="/blog" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.blog', 'Blog & Guides')}</Link>
              <Link href="/glossary" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.glossary', 'Gear Glossary')}</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider">Top Reviews 2026</h4>
            <div className="space-y-2">
              <Link href="/gear/nikon-d3100-review-malaysia-second-hand-price" className="block text-sm text-zinc-400 hover:text-white transition-colors">Nikon D3100 Review</Link>
              <Link href="/gear/sony-a6100-review-malaysia-second-hand" className="block text-sm text-zinc-400 hover:text-white transition-colors">Sony A6100 Review</Link>
              <Link href="/gear/sony-zv-e10-review-malaysia-second-hand" className="block text-sm text-zinc-400 hover:text-white transition-colors">Sony ZV-E10 Review</Link>
              <Link href="/gear/insta360-x4-review-malaysia" className="block text-sm text-zinc-400 hover:text-white transition-colors">Insta360 X4 Review</Link>
              <Link href="/gear/dji-mini-4-pro-review-malaysia" className="block text-sm text-zinc-400 hover:text-white transition-colors">DJI Mini 4 Pro Review</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider">Popular Guides</h4>
            <div className="space-y-2">
              <Link href="/blog/content-creator-malaysia-no-money-start" className="block text-sm text-zinc-400 hover:text-white transition-colors">Start with RM0</Link>
              <Link href="/blog/used-camera-buying-guide-malaysia-mudah-carousell" className="block text-sm text-zinc-400 hover:text-white transition-colors">Used Camera Buying Guide</Link>
              <Link href="/blog/camera-paid-for-part-time-gigs-malaysia" className="block text-sm text-zinc-400 hover:text-white transition-colors">Gig-to-Gear System</Link>
              <Link href="/blog/wedding-photography-side-hustle-malaysia" className="block text-sm text-zinc-400 hover:text-white transition-colors">Wedding Side Hustle</Link>
              <Link href="/blog/graduation-photography-malaysia-guide" className="block text-sm text-zinc-400 hover:text-white transition-colors">Graduation Photography</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center text-sm text-zinc-600">
          <p>{t('footer.copyright', '© 2026 GearUp Malaysia. Prices in Ringgit Malaysia (MYR).')}</p>
          <p className="text-xs">Earnings based on creator estimates. Always verify second-hand gear before buying.</p>
        </div>
      </div>
    </footer>
  );
}
