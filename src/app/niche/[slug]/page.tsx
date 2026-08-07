import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { niches } from '@/data/niches';
import { gearList } from '@/data/gear';
import { nicheImg, gearImg } from '@/data/images';
import { formatPrice, roiColor } from '@/lib/utils';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return niches.map(n => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const niche = niches.find(n => n.slug === slug);
  if (!niche) return {};
  return {
    title: `${niche.title} Content Creation — Best Gear & Tips Malaysia | Kameralog MY`,
    description: niche.description.slice(0, 160),
    openGraph: { title: `${niche.title} Creator Guide — Kameralog Malaysia` },
    alternates: { canonical: `https://kameralog.com/niche/${niche.slug}` },
  };
}

export default async function NichePage({ params }: Props) {
  const { slug } = await params;
  const niche = niches.find(n => n.slug === slug);
  if (!niche) notFound();

  const bestGear = gearList.filter(g => niche.bestGearSlugs.includes(g.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${niche.title} Content Creation Guide — Malaysia`,
    description: niche.description,
    url: `https://kameralog.com/niche/${niche.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-300">{niche.title} Creator Guide</span>
          </nav>

          <div className="mb-10">
            <div className="h-56 md:h-72 rounded-2xl overflow-hidden relative mb-8 bg-zinc-900">
              <img
                src={nicheImg(niche.slug)}
                alt={niche.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/40" />
              <div className="absolute bottom-4 left-4 text-5xl">{niche.image}</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">{niche.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">Malaysia</span></h1>
            <p className="text-xl text-zinc-300 font-semibold mb-4">{niche.tagline}</p>
            <p className="text-zinc-400 leading-relaxed">{niche.description}</p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 mb-10">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <span className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Starter Cost</span>
                <div className="text-2xl font-black text-green-400 mt-1">
                  {niche.starterCost === 0 ? 'RM 0 — Use your phone' : formatPrice(niche.starterCost)}
                </div>
              </div>
              <div>
                <span className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Earning Potential</span>
                <div className="text-2xl font-black text-cyan-400 mt-1">{niche.earningPotential}</div>
              </div>
              <div>
                <span className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Content Ideas</span>
                <div className="text-2xl font-black text-purple-400 mt-1">{niche.contentIdeas.length}</div>
              </div>
            </div>
          </div>

          {bestGear.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Best Gear for {niche.title}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {bestGear.map(g => (
                  <Link key={g.slug} href={`/gear/${g.slug}`} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/30 transition-all group">
                    <div className="h-28 relative overflow-hidden bg-zinc-800">
                      <img
                        src={gearImg(g.slug)}
                        alt={g.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent" />
                    </div>
                    <div className="p-3">
                      <div className="font-bold group-hover:text-red-400 transition-colors text-sm truncate">{g.name}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-xs font-bold ${roiColor(g.roiScore)}`}>ROI {g.roiScore}</span>
                        <span className="text-green-400 font-bold text-xs">{formatPrice(g.priceUsed)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Pro Tips for {niche.title} Creators</h2>
            <div className="space-y-3">
              {niche.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4">
                  <span className="text-cyan-400 font-bold mt-0.5">💡</span>
                  <p className="text-zinc-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Content Ideas to Get You Started</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {niche.contentIdeas.map((idea, i) => (
                <div key={i} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-red-400 font-bold text-lg">{i + 1}.</span>
                  <p className="text-zinc-300">{idea}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/5 to-pink-500/5 border border-red-500/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to start?</h2>
            <p className="text-zinc-400 mb-6">Take the Gear Match quiz and find the perfect gear for your budget.</p>
            <Link href="/quiz" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300">
              Take the Quiz 🎯
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
