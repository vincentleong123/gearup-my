import { articles } from '@/data/articles';
import { BASE_URL, withLang } from '@/lib/lang';

export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function plainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET() {
  const items = [...articles]
    .filter(a => a.status !== 'draft')
    .sort((a, b) => (a.reviewedAt || a.date) < (b.reviewedAt || b.date) ? 1 : -1)
    .slice(0, 30);

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    `<title>Kameralog Malaysia — Camera &amp; Gear Reviews</title>`,
    `<link>${BASE_URL}/blog</link>`,
    `<description>Camera reviews, second-hand prices in Ringgit, and how Malaysian part-time gigs pay for your gear.</description>`,
    '<language>en-my</language>',
    `<atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>`,
    ...items.map(a => {
      const lang = a.lang ?? 'en';
      const url = `${BASE_URL}${withLang(lang, `/blog/${a.slug}`)}`;
      const date = new Date(a.reviewedAt || a.date);
      const pub = Number.isNaN(date.getTime()) ? undefined : date.toUTCString();
      return [
        '<item>',
        `<title>${esc(a.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        pub ? `<pubDate>${pub}</pubDate>` : '',
        `<description>${esc(plainText(a.description || a.content).slice(0, 400))}</description>`,
        '</item>',
      ].filter(Boolean).join('');
    }),
    '</channel>',
    '</rss>',
  ].join('\n');

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
