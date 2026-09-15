import { MetadataRoute } from 'next';
import { gearList } from '@/data/gear';
import { creators } from '@/data/creators';
import { articles } from '@/data/articles';
import { niches } from '@/data/niches';
import { gigs } from '@/data/gigs';
import { visibleSecuritySystems } from '@/data/security';
import { LANGS } from '@/i18n/langs';
import { withLang } from '@/lib/lang';
import { readSettings } from '@/lib/cms/settings';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { siteUrl } = await readSettings();
  const base = siteUrl.replace(/\/$/, '');
  const now = new Date().toISOString();

  const staticPages = [
    { path: '/', lastModified: now, changeFrequency: 'daily' as const, priority: 1 },
    { path: '/gear', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/creators', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/blog', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/security', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/calculator', lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/compare', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/quiz', lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/niche', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/glossary', lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/gigs', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/curate', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/advertise', lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/videos', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/hashtags', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/about', lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/contact', lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/review-policy', lastModified: now, changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/author/vincent', lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  const dynamicPages = [
    ...gearList.map(g => ({ path: `/gear/${g.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...creators.map(c => ({ path: `/creators/${c.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...articles.map(a => ({ path: `/blog/${a.slug}`, lastModified: a.reviewedAt || a.date, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...niches.map(n => ({ path: `/niche/${n.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...gigs.map(g => ({ path: `/gigs/${g.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...visibleSecuritySystems().map(s => ({ path: `/security/${s.slug}`, lastModified: s.date, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];

  const langUrl = (lang: string, path: string) => `${base}${withLang(lang, path)}`;

  const entry = (lang: string, p: { path: string; lastModified: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }) => ({
    url: langUrl(lang, p.path), lastModified: p.lastModified, changeFrequency: p.changeFrequency, priority: p.priority,
  });

  return [
    ...staticPages.flatMap(p => LANGS.map(l => entry(l, p))),
    ...gearList.map(g => entry('en', { path: `/gear/${g.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })),
    ...creators.map(c => entry('en', { path: `/creators/${c.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 })),
    ...articles.map(a => entry(a.lang ?? 'en', { path: `/blog/${a.slug}`, lastModified: a.reviewedAt || a.date, changeFrequency: 'monthly', priority: 0.7 })),
    ...niches.map(n => entry('en', { path: `/niche/${n.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 })),
    ...gigs.map(g => entry('en', { path: `/gigs/${g.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 })),
    ...visibleSecuritySystems().map(s => entry(s.lang ?? 'en', { path: `/security/${s.slug}`, lastModified: s.date, changeFrequency: 'monthly', priority: 0.7 })),
  ];
}
