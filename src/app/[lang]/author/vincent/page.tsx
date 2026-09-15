import { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { BASE_URL, langAlternates, withLang } from '@/lib/lang';
import { articles } from '@/data/articles';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Vincent — Camera Gear Reviewer & Content Creator | Kameralog Malaysia',
    description: 'Vincent is a Malaysian content creator and camera gear reviewer. 10+ years for马来西亚 experience in photography, videography, and the creator economy.',
    ...langAlternates(lang, '/author/vincent'),
  };
}

export default async function AuthorPage({ params }: Props) {
  const { lang } = await params;
  const authorArticles = articles.filter(a => a.author === 'Vincent' || a.author === 'Vincent Leong').slice(0, 12);

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vincent Leong',
    alternateName: 'Vincent',
    url: `${BASE_URL}${withLang(lang, '/author/vincent')}`,
    jobTitle: 'Camera Gear Reviewer & Content Creator',
    worksFor: { '@type': 'Organization', name: 'Kameralog Malaysia' },
    description: 'Malaysian content creator with 10+ years of experience in photography, videography, and the creator economy. Founder of Kameralog Malaysia — a camera gear review journal focused on ROI for Malaysian creators.',
    knowsAbout: [
      'Camera Reviews',
      'Photography',
      'Videography',
      'Content Creation',
      'Drone Photography',
      'Malaysian Creator Economy',
      'Second-Hand Camera Market',
      'Gear ROI Analysis',
    ],
    sameAs: [],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}${withLang(lang, '/author/vincent')}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <Nav />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Author Header */}
          <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-4xl font-black text-white shrink-0">
              V
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-3">Vincent Leong</h1>
              <p className="text-lg text-zinc-200 mb-4">Camera Gear Reviewer & Content Creator</p>
              <p className="text-zinc-200 leading-relaxed">
                10+ years in photography and videography. Built Kameralog to answer one question:
                <strong className="text-amber-300"> how fast does this gear pay for itself?</strong>
              </p>
              <p className="text-zinc-200 leading-relaxed mt-3">
                Based in Malaysia. Reviews gear the way a working creator actually uses it — for graduation shoots,
                wedding coverage, real estate video, TikTok content, and side hustles that actually bring in money.
                Real second-hand prices from Mudah, Carousell, and local shops.
              </p>
            </div>
          </div>

          {/* Expertise */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Camera Reviews', 'Drone Photography', 'Second-Hand Market', 'Content Creation', 'Video Production', 'Gear ROI', 'Malaysian Creator Economy', 'Side Hustle Strategy'].map(t => (
                <div key={t} className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 text-center">{t}</div>
              ))}
            </div>
          </div>

          {/* Articles by Vincent */}
          {authorArticles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Articles by Vincent</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {authorArticles.map(a => (
                  <Link key={a.slug} href={withLang(lang, `/blog/${a.slug}`)} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-red-500/30 transition-all group">
                    <h3 className="font-bold group-hover:text-red-400 transition-colors mb-2">{a.title}</h3>
                    <p className="text-sm text-zinc-200 line-clamp-2">{a.description}</p>
                    <span className="text-xs text-zinc-200 mt-2 block">{a.date} · {a.readTime} min read</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
