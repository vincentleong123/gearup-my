import { MetadataRoute } from 'next';
import { readSettings } from '@/lib/cms/settings';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { siteUrl } = await readSettings();
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/preview-hero'],
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot'],
        disallow: '/',
      },
    ],
    sitemap: `${siteUrl.replace(/\/$/, '')}/sitemap.xml`,
  };
}
