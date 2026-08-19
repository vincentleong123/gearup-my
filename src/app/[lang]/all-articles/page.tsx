import { Metadata } from 'next';
import Link from 'next/link';
import { articles, type Article } from '@/data/articles';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { langAlternates, withLang, BASE_URL } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'All Articles — Every Review & Guide on Kameralog Malaysia',
    description: 'The complete index of all Kameralog Malaysia articles: camera reviews, creator guides, ROI analysis, gig pricing, and gear comparisons for Malaysian content creators.',
    openGraph: {
      title: 'All Articles — Kameralog Malaysia',
      description: 'Complete index of every article, guide, and review on Kameralog Malaysia.',
      url: `${BASE_URL}${lang === 'en' ? '/all-articles' : `/${lang}/all-articles`}`,
      type: 'website',
    },
    robots: { index: true, follow: true },
    ...langAlternates(lang, '/all-articles'),
  };
}

function Stats({ articles }: { articles: Article[] }) {
  const total = articles.length;
  const en = articles.filter(a => !a.lang).length;
  const ms = articles.filter(a => a.lang === 'ms').length;
  const cats = [...new Set(articles.map(a => a.category))];
  const totalReadTime = articles.reduce((sum, a) => sum + a.readTime, 0);
  const withQA = articles.filter(a => a.qaPairs && a.qaPairs.length > 0).length;
  const withGear = articles.filter(a => a.relatedGear.length > 0).length;
  const uniqueTags = [...new Set(articles.flatMap(a => a.tags))].length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
      {[
        { label: 'Articles', value: total, color: 'text-white' },
        { label: 'Categories', value: cats.length, color: 'text-emerald-400' },
        { label: 'Total read time', value: `${totalReadTime} min`, color: 'text-amber-400' },
        { label: 'Unique tags', value: uniqueTags, color: 'text-pink-400' },
        { label: 'English', value: en, color: 'text-blue-400' },
        { label: 'Bahasa Melayu', value: ms, color: 'text-red-400' },
        { label: 'With Q&A pairs', value: withQA, color: 'text-green-400' },
      ].map(s => (
        <div key={s.label} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-center">
          <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
          <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function ArticleTable({ articles, lang }: { articles: Article[]; lang: string }) {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const categories = [...new Set(sorted.map(a => a.category))];

  return (
    <div className="space-y-8">
      {categories.map(cat => {
        const catArticles = sorted.filter(a => a.category === cat);
        return (
          <div key={cat}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-black capitalize">{cat}</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50">{catArticles.length}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-left">
                    <th className="pb-2 font-semibold">Title</th>
                    <th className="pb-2 font-semibold hidden sm:table-cell">Lang</th>
                    <th className="pb-2 font-semibold hidden md:table-cell">Read</th>
                    <th className="pb-2 font-semibold hidden md:table-cell">Tags</th>
                    <th className="pb-2 font-semibold hidden lg:table-cell">Gear</th>
                    <th className="pb-2 font-semibold hidden lg:table-cell">Q&A</th>
                  </tr>
                </thead>
                <tbody>
                  {catArticles.map(a => (
                    <tr key={a.slug} className="border-b border-zinc-800/50 hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3 pr-4">
                        <Link href={withLang(a.lang ?? lang, `/blog/${a.slug}`)} className="font-semibold text-zinc-100 hover:text-emerald-400 transition-colors line-clamp-1">
                          {a.title}
                        </Link>
                        <div className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{a.description}</div>
                        <div className="text-[11px] text-zinc-600 mt-0.5 sm:hidden">{a.lang?.toUpperCase() ?? 'EN'} · {a.readTime}min</div>
                      </td>
                      <td className="py-3 hidden sm:table-cell">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          a.lang === 'ms' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                          'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                        }`}>
                          {a.lang?.toUpperCase() ?? 'EN'}
                        </span>
                      </td>
                      <td className="py-3 text-zinc-400 hidden md:table-cell">{a.readTime} min</td>
                      <td className="py-3 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {a.tags.slice(0, 3).map(t => (
                            <span key={t} className="text-[10px] text-zinc-500 bg-zinc-800/60 px-1.5 py-0.5 rounded">#{t}</span>
                          ))}
                          {a.tags.length > 3 && <span className="text-[10px] text-zinc-600">+{a.tags.length - 3}</span>}
                        </div>
                      </td>
                      <td className="py-3 text-zinc-500 text-xs hidden lg:table-cell">{a.relatedGear.length}</td>
                      <td className="py-3 hidden lg:table-cell">
                        {a.qaPairs && a.qaPairs.length > 0 ? (
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/30">{a.qaPairs.length}</span>
                        ) : (
                          <span className="text-xs text-zinc-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function AllArticlesPage({ params }: Props) {
  const { lang } = await params;

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 font-semibold mb-4">
              📋 Complete Article Index
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Articles</span>
            </h1>
            <p className="text-zinc-200 max-w-2xl mx-auto text-lg leading-relaxed">
              The complete index of every review, guide, and analysis on Kameralog Malaysia. Built for auditors, advertisers, and anyone who wants the full picture at a glance.
            </p>
          </div>

          {/* Stats */}
          <Stats articles={articles} />

          {/* Article table */}
          <ArticleTable articles={articles} lang={lang} />

          {/* Cross-links footer */}
          <div className="mt-16 pt-8 border-t border-zinc-800">
            <p className="text-sm text-zinc-600 text-center">
              More projects by this creator:{' '}
              <a href="https://xmelayu.site" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">xmelayu.site</a>
              {' '}&{' '}
              <a href="https://superxhentai.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">superxhentai.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
