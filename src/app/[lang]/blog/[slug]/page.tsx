import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { articles, type Article } from '@/data/articles';
import { gearList } from '@/data/gear';
import { blogImg } from '@/data/images';
import { formatPrice } from '@/lib/utils';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import MarkdownBody from '@/components/MarkdownBody';
import CurationWall from '@/components/CurationWall';
import ArticleQA from '@/components/ArticleQA';
import AskAnything from '@/components/AskAnything';
import { articleFigures } from '@/data/curated';
import { articleTopic } from '@/lib/curation';
import { type Lang } from '@/i18n/langs';
import { BASE_URL, langAlternates, withLang } from '@/lib/lang';
import { getPostType } from '@/admin/types';
import { readPost } from '@/lib/cms/fs';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return articles.map(a => ({ lang: a.lang ?? 'en', slug: a.slug }));
}

const realLang = (a: { lang?: 'ms' | 'zh' }): Lang => a.lang ?? 'en';

async function previewArticle(slug: string): Promise<Article | null> {
  if (process.env.NODE_ENV !== 'development') return null;
  const type = getPostType('article');
  if (!type) return null;
  try {
    const post = await readPost(type, slug);
    const v = post.values;
    return {
      slug: post.slug,
      title: String(v.title || slug),
      description: String(v.description || ''),
      content: String(v.body || ''),
      image: String(v.image || ''),
      category: ((v.category as string) || 'guide') as Article['category'],
      readTime: Number(v.readTime) || 5,
      date: String(v.date || ''),
      tags: Array.isArray(v.tags) ? v.tags.map(String) : [],
      relatedGear: Array.isArray(v.relatedGear) ? v.relatedGear.map(String) : [],
      ...(v.lang ? { lang: v.lang as 'ms' } : {}),
      ...(v.author ? { author: String(v.author) } : {}),
      ...(v.reviewedAt ? { reviewedAt: String(v.reviewedAt).slice(0, 10) } : {}),
      ...(Array.isArray(v.imageCuration) ? { imageCuration: v.imageCuration as Article['imageCuration'] } : {}),
      ...(Array.isArray(v.qaPairs)
        ? { qaPairs: (v.qaPairs as { question: string; answer: string }[]) }
        : {}),
      ...(v.seoTitle ? { seoTitle: String(v.seoTitle) } : {}),
      ...(v.seoDescription ? { seoDescription: String(v.seoDescription) } : {}),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = articles.find(a => a.slug === slug);
  if (!article) return {};
  const rl = realLang(article);
  const articleUrl = `${BASE_URL}${withLang(rl, `/blog/${article.slug}`)}`;
  const img = article.image || blogImg(article.slug);
  const ogImage = img.startsWith('http') ? img : `${BASE_URL}${img}`;
  return {
    title: article.seoTitle || `${article.title} | Kameralog Malaysia`,
    description: article.seoDescription || article.description,
    openGraph: {
      title: article.title,
      description: article.seoDescription || article.description,
      url: articleUrl,
      siteName: 'Kameralog Malaysia',
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
      locale: rl === 'ms' ? 'ms_MY' : rl === 'zh' ? 'zh_MY' : 'en_MY',
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.reviewedAt || article.date,
      authors: article.author ? [article.author] : ['Kameralog Malaysia'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.seoDescription || article.description,
      images: [ogImage],
    },
    ...langAlternates(rl, `/blog/${article.slug}`, [rl]),
  };
}

export default async function ArticlePage({ params, searchParams }: Props) {
  const { lang, slug } = await params;
  const sp = await searchParams;
  const isPreview = process.env.NODE_ENV === 'development' && sp?.preview === '1';

  let article = articles.find(a => a.slug === slug);
  if (isPreview) {
    const preview = await previewArticle(slug);
    if (preview) article = preview;
  }
  if (!article) notFound();
  if (!isPreview && lang !== realLang(article)) redirect(withLang(realLang(article), `/blog/${article.slug}`));

  const relatedGear = gearList.filter(g => article.relatedGear.includes(g.slug));
  const figures = articleFigures(article.slug);
  const heroImg = article.image || blogImg(article.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: heroImg.startsWith('http') ? heroImg : `${BASE_URL}${heroImg}`,
    datePublished: article.date,
    dateModified: article.reviewedAt || article.date,
    author: article.author
      ? { '@type': 'Person', name: article.author }
      : { '@type': 'Organization', name: 'Kameralog Malaysia' },
    publisher: {
      '@type': 'Organization',
      name: 'Kameralog Malaysia',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/og-image.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}${withLang(lang, `/blog/${article.slug}`)}` },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}${withLang(lang, '/')}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}${withLang(lang, '/blog')}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${BASE_URL}${withLang(lang, `/blog/${article.slug}`)}` },
    ],
  };

  const faqLd = article.qaPairs && article.qaPairs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.qaPairs.map((p: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: p.question,
          acceptedAnswer: { '@type': 'Answer', text: p.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <Nav />
      <article className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href={withLang(lang, '/')} className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={withLang(lang, '/blog')} className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-100 line-clamp-1">{article.title}</span>
          </nav>

          <div className="mb-10">
            <div className="h-48 md:h-64 rounded-2xl overflow-hidden relative mb-6 bg-zinc-900">
              <img
                src={heroImg}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 uppercase">{article.category}</span>
              {article.lang === 'ms' && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 uppercase">Bahasa Melayu</span>
              )}
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
              {article.author && <span>·</span>}
              {article.author && <span className="text-zinc-300">{article.author}</span>}
              {article.reviewedAt && <span className="text-xs text-zinc-600">· updated {article.reviewedAt}</span>}
              {isPreview && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">Preview</span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">{article.title}</h1>
            <p className="text-xl text-zinc-200">{article.description}</p>
          </div>

          <MarkdownBody content={article.content} figures={figures} imageCuration={article.imageCuration} />

          {/* Q&A Section */}
          {article.qaPairs && article.qaPairs.length > 0 && (
            <ArticleQA pairs={article.qaPairs} articleTitle={article.title} />
          )}
          <AskAnything articleTitle={article.title} articleContent={article.content} />

          {/* Watch it in the wild */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold">Watch real creators doing this</h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 uppercase">Live</span>
            </div>
            <p className="text-zinc-200 mb-4">
              Skip the theory — see who&apos;s already making money with this on Instagram, TikTok and YouTube. Tap any tile to open the live search and study real posts.
            </p>
            <CurationWall topics={[articleTopic(article)]} title={`#${article.tags[0] || article.slug} in the wild`} />
          </div>

          {/* Related Gear */}
          {relatedGear.length > 0 && (
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <h2 className="text-2xl font-bold mb-6">Related Gear</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedGear.map(g => (
                  <Link key={g.slug} href={withLang('en', `/gear/${g.slug}`)} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-red-500/30 transition-all group">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold group-hover:text-red-400 transition-colors">{g.name}</h3>
                      <span className="text-green-400 font-bold text-sm">{formatPrice(g.priceUsed)}</span>
                    </div>
                    <p className="text-sm text-zinc-200 line-clamp-2">{g.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(t => (
                <span key={t} className="text-xs text-zinc-500 bg-zinc-800/50 px-3 py-1.5 rounded-full">#{t}</span>
              ))}
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}

