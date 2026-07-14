import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { gearList } from '@/data/gear';
import { h, formatPrice } from '@/lib/utils';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | GearUp Malaysia`,
    description: article.description,
    openGraph: { title: article.title, description: article.description },
    alternates: { canonical: `https://gearup.my/blog/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);
  if (!article) notFound();

  const relatedGear = gearList.filter(g => article.relatedGear.includes(g.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'GearUp Malaysia' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://gearup.my/blog/${article.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <article className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-300 line-clamp-1">{article.title}</span>
          </nav>

          <div className="mb-10">
            <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 uppercase">{article.category}</span>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">{article.title}</h1>
            <p className="text-xl text-zinc-400">{article.description}</p>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            {article.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold mt-10 mb-4">{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-bold mt-8 mb-3">{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace(/\*\*/g, '')}</h3>;
              }
              if (line.startsWith('|')) {
                // Simple table rendering
                const cells = line.split('|').filter(Boolean);
                if (cells.length > 0 && !line.includes('---')) {
                  const isHeader = line.includes('---') ? false : i > 0 && article.content.split('\n')[i - 1]?.startsWith('|---');
                  if (isHeader) return null;
                  return (
                    <div key={i} className={`flex gap-4 py-2 ${line.includes('---') ? 'border-b border-zinc-700' : ''}`}>
                      {cells.map((c, j) => (
                        <div key={j} className="flex-1 text-sm" style={j === 0 ? { fontWeight: 600 } : {}}>{c.trim()}</div>
                      ))}
                    </div>
                  );
                }
                return null;
              }
              if (line.startsWith('- **')) {
                const match = line.match(/- \*\*(.+?)\*\*(.*)/);
                if (match) {
                  return <li key={i} className="text-zinc-300 mb-1 ml-4"><strong>{match[1]}</strong>{match[2]}</li>;
                }
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="text-zinc-300 mb-1 ml-4">{line.slice(2)}</li>;
              }
              if (/^\d+\.\s/.test(line)) {
                return <li key={i} className="text-zinc-300 mb-2 ml-4 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
              }
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="text-zinc-300 leading-relaxed mb-4 text-lg">{line}</p>;
            })}
          </div>

          {/* Related Gear */}
          {relatedGear.length > 0 && (
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <h2 className="text-2xl font-bold mb-6">Related Gear</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedGear.map(g => (
                  <Link key={g.slug} href={`/gear/${g.slug}`} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-red-500/30 transition-all group">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold group-hover:text-red-400 transition-colors">{g.name}</h3>
                      <span className="text-green-400 font-bold text-sm">{formatPrice(g.priceUsed)}</span>
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-2">{g.excerpt}</p>
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
