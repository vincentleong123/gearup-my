import { MetadataRoute } from 'next';
import { gearList } from '@/data/gear';
import { creators } from '@/data/creators';
import { articles } from '@/data/articles';
import { niches } from '@/data/niches';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://gearup.my';

  const staticPages = [
    { url: base, lastModified: '2026-07-15', changeFrequency: 'daily' as const, priority: 1 },
    { url: `${base}/gear`, lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/creators`, lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/blog`, lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/calculator`, lastModified: '2026-07-15', changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/compare`, lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${base}/quiz`, lastModified: '2026-07-15', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/niche`, lastModified: '2026-07-15', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/glossary`, lastModified: '2026-07-15', changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  const gearPages = gearList.map(g => ({
    url: `${base}/gear/${g.slug}`,
    lastModified: '2026-07-15',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const creatorPages = creators.map(c => ({
    url: `${base}/creators/${c.slug}`,
    lastModified: '2026-07-15',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articlePages = articles.map(a => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: a.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const nichePages = niches.map(n => ({
    url: `${base}/niche/${n.slug}`,
    lastModified: '2026-07-15',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...gearPages, ...creatorPages, ...articlePages, ...nichePages];
}
