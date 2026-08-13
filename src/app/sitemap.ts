import { MetadataRoute } from 'next';
import { gearList } from '@/data/gear';
import { creators } from '@/data/creators';
import { articles } from '@/data/articles';
import { niches } from '@/data/niches';
import { gigs } from '@/data/gigs';
import { LANGS } from '@/i18n/langs';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://kameralog.com';

  const staticPages = [
    { path: '/', lastModified: '2026-07-15', changeFrequency: 'daily' as const, priority: 1 },
    { path: '/gear', lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/creators', lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/blog', lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/calculator', lastModified: '2026-07-15', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/compare', lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/quiz', lastModified: '2026-07-15', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/niche', lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/glossary', lastModified: '2026-07-15', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/gigs', lastModified: '2026-08-01', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/curate', lastModified: '2026-08-01', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/advertise', lastModified: '2026-08-01', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/videos', lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/hashtags', lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/about', lastModified: '2026-08-12', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/contact', lastModified: '2026-08-12', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/review-policy', lastModified: '2026-08-12', changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  const dynamicPages = [
    ...gearList.map(g => ({ path: `/gear/${g.slug}`, lastModified: '2026-07-15', changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...creators.map(c => ({ path: `/creators/${c.slug}`, lastModified: '2026-07-15', changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...articles.map(a => ({ path: `/blog/${a.slug}`, lastModified: a.date, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...niches.map(n => ({ path: `/niche/${n.slug}`, lastModified: '2026-07-15', changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...gigs.map(g => ({ path: `/gigs/${g.slug}`, lastModified: '2026-08-01', changeFrequency: 'weekly' as const, priority: 0.8 })),
  ];

  const langUrl = (lang: string, path: string) =>
    path === '/' ? `${base}/${lang}` : `${base}/${lang}${path}`;

  const entry = (lang: string, p: { path: string; lastModified: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }) => ({
    url: langUrl(lang, p.path), lastModified: p.lastModified, changeFrequency: p.changeFrequency, priority: p.priority,
  });

  return [
    ...staticPages.flatMap(p => LANGS.map(l => entry(l, p))),
    ...gearList.map(g => entry('en', { path: `/gear/${g.slug}`, lastModified: '2026-07-15', changeFrequency: 'monthly', priority: 0.8 })),
    ...creators.map(c => entry('en', { path: `/creators/${c.slug}`, lastModified: '2026-07-15', changeFrequency: 'monthly', priority: 0.7 })),
    ...articles.map(a => entry(a.lang ?? 'en', { path: `/blog/${a.slug}`, lastModified: a.date, changeFrequency: 'monthly', priority: 0.7 })),
    ...niches.map(n => entry('en', { path: `/niche/${n.slug}`, lastModified: '2026-07-15', changeFrequency: 'monthly', priority: 0.7 })),
    ...gigs.map(g => entry('en', { path: `/gigs/${g.slug}`, lastModified: '2026-08-01', changeFrequency: 'weekly', priority: 0.8 })),
  ];
}
