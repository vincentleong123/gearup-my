'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/context';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-black text-lg mb-3">
              <span>📸</span>
              <span>GearUp</span>
              <span className="text-xs bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-0.5 rounded-md font-bold">MY</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {t('footer.tagline', 'Helping Malaysian creators find gear that pays for itself. Real reviews, real prices, real earnings.')}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider">{t('footer.explore', 'Explore')}</h4>
            <div className="space-y-2">
              <Link href="/#gear" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.gear', 'Gear Reviews')}</Link>
              <Link href="/gigs" className="block text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium">{t('nav.gigs', 'Gigs That Pay For Your Gear')}</Link>
              <Link href="/compare" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.compare', 'Compare Gear')}</Link>
              <Link href="/quiz" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.quiz', 'Gear Match Quiz')}</Link>
              <Link href="/#creators" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.creators', 'Creator Stories')}</Link>
              <Link href="/#calculator" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.roiCalc', 'ROI Calculator')}</Link>
              <Link href="/blog" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.blog', 'Blog & Guides')}</Link>
              <Link href="/curate" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.curate', 'Inspiration Wall')}</Link>
              <Link href="/glossary" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('nav.glossary', 'Gear Glossary')}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider">{t('footer.popularGear', 'Popular Gear')}</h4>
            <div className="space-y-2">
              <Link href="/niche/food-review" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('niche.title', '🍜 Food Creator Guide')}</Link>
              <Link href="/niche/tech-review" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('niche.title', '💻 Tech Creator Guide')}</Link>
              <Link href="/niche/beauty-fashion" className="block text-sm text-zinc-400 hover:text-white transition-colors">{t('niche.title', '💄 Beauty Creator Guide')}</Link>
              <Link href="/gear/nikon-d3100-review-malaysia-second-hand-price" className="block text-sm text-zinc-400 hover:text-white transition-colors">Nikon D3100 Review</Link>
              <Link href="/gear/sony-a6100-review-malaysia-second-hand" className="block text-sm text-zinc-400 hover:text-white transition-colors">Sony A6100 Review</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800/50 mt-8 pt-8 text-center text-sm text-zinc-600">
          {t('footer.copyright', '© 2026 GearUp Malaysia. Prices in Ringgit Malaysia (MYR). Earnings based on creator estimates. Always verify second-hand gear before buying.')}
        </div>
      </div>
    </footer>
  );
}
