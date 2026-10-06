'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/context';
import { withLang } from '@/lib/lang';
import type { Lang } from '@/i18n/context';

function Logo({ id = 'gubar-foot', lang }: { id?: string; lang: Lang }) {
  return (
    <Link href={withLang(lang, '/')} className="flex items-center gap-2.5 font-black text-lg tracking-tight">
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
        <span className="text-zinc-950">Kameralog</span>
        <span className="text-xs bg-gradient-to-r from-red-500 to-pink-600 text-white px-1.5 py-0.5 rounded-md font-bold">MY</span>
      </span>
    </Link>
  );
}

export default function Footer() {
  const { t, lang } = useLang();

  return (
    <footer className="border-t border-zinc-200 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-600/[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        {/* About the founder */}
        <div className="gradient-border rounded-3xl bg-zinc-50 p-8 md:p-10 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-black mb-2">
                {t('footer.dreamHead', 'A 10-year research log,')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-600 to-fuchsia-600">{t('footer.dreamHeadAccent', 'still open')}</span>
              </h3>
              <p className="text-zinc-600 text-sm md:text-base">
                {t('footer.dreamSub', "Kameralog started life as cameralogue.com in 2016 — a personal log of cameras I was weighing up. Ten years later it's the dashboard I use to answer one question: which camera should I buy to earn ringgit? Used prices, gig rates and ROI math, in one place. Nothing is sold here — it's just the working notes.")}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-zinc-600">
                {t('footer.follow', "The best way to follow along is free: new reviews and price drops land here every week. The founder posts gear shots and behind-the-scenes on Instagram.")}
              </p>
              <a
                href="https://instagram.com/cameralogue"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-700 transition-colors"
              >
                <span>📸</span> @cameralogue →
              </a>
            </div>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8 pt-6 border-t border-zinc-200 text-xs text-zinc-600">
            <span className="inline-flex items-center gap-1.5"><span>🇲🇾</span> {t('footer.badge.prices', 'Malaysian prices in MYR')}</span>
            <span className="inline-flex items-center gap-1.5"><span>🆕</span> {t('footer.badge.edition', '2026 Edition — updated Aug 2026')}</span>
            <span className="inline-flex items-center gap-1.5"><span>📖</span> {t('footer.badge.free', 'Free to read, no newsletter spam')}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <Logo lang={lang} />
            <p className="text-zinc-600 text-sm leading-relaxed mt-4">
              {t('footer.tagline', 'A personal research desk for the camera-buying decision: used prices in MYR, real gig rates, and ROI math. Nothing for sale — just the numbers.')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-900 mb-3 uppercase tracking-wider">{t('footer.explore', 'Explore')}</h4>
            <div className="space-y-2">
              <Link href={withLang(lang, '/#gear')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">{t('nav.gear', 'Gear Reviews')}</Link>
              <Link href={withLang(lang, '/gigs')} className="block text-sm text-amber-600 hover:text-amber-700 transition-colors font-medium">{t('nav.gigs', 'Gigs That Pay For Your Gear')}</Link>
              <Link href={withLang(lang, '/compare')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">{t('nav.compare', 'Compare Gear')}</Link>
              <Link href={withLang(lang, '/quiz')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">{t('nav.quiz', 'Gear Match Quiz')}</Link>
              <Link href={withLang(lang, '/blog')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">{t('nav.blog', 'Blog & Guides')}</Link>
              <Link href={withLang(lang, '/security')} className="block text-sm text-cyan-700 hover:text-cyan-800 transition-colors font-medium">{t('nav.security', 'Security Systems')}</Link>
              <Link href={withLang(lang, '/glossary')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">{t('nav.glossary', 'Gear Glossary')}</Link>
              <Link href={withLang(lang, '/about')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">{t('nav.about', 'About Us')}</Link>
              <Link href={withLang(lang, '/review-policy')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">{t('nav.reviewPolicy', 'Review Policy')}</Link>
              <Link href={withLang(lang, '/contact')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">{t('nav.contact', 'Contact')}</Link>
              <Link href={withLang(lang, '/advertise')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">{t('footer.advertise', 'Advertise')}</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-900 mb-3 uppercase tracking-wider">{t('footer.topReviews', 'Top Reviews 2026')}</h4>
            <div className="space-y-2">
              <Link href={withLang(lang, '/gear/dji-mini-4-pro-review-malaysia')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">DJI Mini 4 Pro Review</Link>
              <Link href={withLang(lang, '/gear/dji-mini-5-review-malaysia')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">DJI Mini 5 Review</Link>
              <Link href={withLang(lang, '/gear/insta360-x4-review-malaysia')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Insta360 X4 Review</Link>
              <Link href={withLang(lang, '/gear/insta360-x5-review-malaysia')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Insta360 X5 Review</Link>
              <Link href={withLang(lang, '/gear/dji-osmo-pocket-3-review-malaysia')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">DJI Osmo Pocket 3 Review</Link>
              <Link href={withLang(lang, '/gear/fujifilm-x100vi-review-malaysia')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Fujifilm X100VI Review</Link>
              <Link href={withLang(lang, '/gear/sony-zv-e10-review-malaysia-second-hand')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Sony ZV-E10 Review</Link>
              <Link href={withLang(lang, '/gear/sony-a6100-review-malaysia-second-hand')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Sony A6100 Review</Link>
              <Link href={withLang(lang, '/gear/tapo-c210-review-malaysia')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Tapo C210 Review</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-900 mb-3 uppercase tracking-wider">{t('footer.popularGuides', 'Popular Guides')}</h4>
            <div className="space-y-2">
              <Link href={withLang(lang, '/blog/content-creator-malaysia-no-money-start')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Start with RM0</Link>
              <Link href={withLang(lang, '/blog/used-camera-buying-guide-malaysia-mudah-carousell')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Used Camera Buying Guide</Link>
              <Link href={withLang(lang, '/blog/camera-paid-for-part-time-gigs-malaysia')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Gig-to-Gear System</Link>
              <Link href={withLang(lang, '/blog/wedding-photography-side-hustle-malaysia')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Wedding Side Hustle</Link>
              <Link href={withLang(lang, '/blog/graduation-photography-malaysia-guide')} className="block text-sm text-zinc-600 hover:text-red-600 transition-colors">Graduation Photography</Link>
              <Link href={withLang(lang, '/blog/cctv-home-security-camera-guide-malaysia')} className="block text-sm text-cyan-700 hover:text-cyan-800 transition-colors font-medium">CCTV Buying Guide</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center text-sm text-zinc-600">
          <p>{t('footer.copyright', '© 2026 Kameralog Malaysia. Prices in Ringgit Malaysia (MYR).')}</p>
          <div className="flex items-center gap-4">
            <Link href={withLang(lang, '/about')} className="text-xs text-zinc-600 hover:text-red-600 transition-colors">{t('nav.about', 'About Us')}</Link>
            <Link href={withLang(lang, '/review-policy')} className="text-xs text-zinc-600 hover:text-red-600 transition-colors">{t('nav.reviewPolicy', 'Review Policy')}</Link>
            <Link href={withLang(lang, '/contact')} className="text-xs text-zinc-600 hover:text-red-600 transition-colors">{t('nav.contact', 'Contact')}</Link>
          </div>
          <p className="text-xs text-zinc-500">{t('footer.disclaimer', 'Earnings based on creator estimates. Always verify second-hand gear before buying.')}</p>
        </div>
      </div>
    </footer>
  );
}
