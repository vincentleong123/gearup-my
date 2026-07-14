import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { creators, getCreatorBySlug } from '@/data/creators';
import { gearList } from '@/data/gear';
import { h, formatPrice } from '@/lib/utils';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return creators.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);
  if (!creator) return {};
  return {
    title: `${creator.name} — Malaysian ${creator.niche} Creator Story & Earnings | GearUp MY`,
    description: `${creator.name} started with ${creator.startedWith}. Now earns RM${creator.monthlyEarningsMin.toLocaleString()}+/month. See their gear, income breakdown, and advice for new creators.`,
    openGraph: { title: `${creator.name} — Creator Story | GearUp Malaysia`, description: `From ${creator.startedWith} to RM${creator.monthlyEarningsMin.toLocaleString()}+/month.` },
    alternates: { canonical: `https://gearup.my/creators/${creator.slug}` },
  };
}

export default async function CreatorPage({ params }: Props) {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);
  if (!creator) notFound();

  const creatorGear = gearList.filter(g => creator.gearSlugs.includes(g.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: creator.name,
    description: `${creator.niche} content creator in Malaysia. Earns RM${creator.monthlyEarningsMin.toLocaleString()}+ monthly.`,
    knowsAbout: creator.gear,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://gearup.my/creators/${creator.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <article className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/creators" className="hover:text-white transition-colors">Creators</Link>
            <span>/</span>
            <span className="text-zinc-300">{creator.name}</span>
          </nav>

          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-4xl font-black text-cyan-400">
              {creator.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black">{creator.name}</h1>
              <div className="text-lg text-zinc-500">{creator.handle}</div>
              <div className="text-sm text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full inline-block mt-2 font-semibold">{creator.niche}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 text-center">
              <div className="text-2xl font-black text-green-400">RM {creator.monthlyEarningsMin.toLocaleString()}+</div>
              <div className="text-sm text-zinc-500">Monthly Earnings</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 text-center">
              <div className="text-2xl font-black text-cyan-400">{creator.roiMonths} mo</div>
              <div className="text-sm text-zinc-500">Time to Breakeven</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 text-center">
              <div className="text-2xl font-black text-zinc-300">{creator.startedWith.length > 20 ? creator.startedWith.slice(0, 18) + '…' : creator.startedWith}</div>
              <div className="text-sm text-zinc-500">Started With</div>
            </div>
          </div>

          {/* Story */}
          <div className="prose prose-invert prose-zinc max-w-none mb-10">
            <h2 className="text-2xl font-bold">The Story</h2>
            <p className="text-zinc-300 leading-relaxed text-lg">{creator.story}</p>
          </div>

          {/* Income Breakdown */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 mb-10">
            <h2 className="text-xl font-bold mb-4">💰 Income Breakdown</h2>
            <div className="space-y-3">
              {creator.incomeBreakdown.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Advice */}
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6 mb-10">
            <h2 className="text-xl font-bold text-cyan-400 mb-3">💬 Advice for Tim & Ahmad</h2>
            <p className="text-zinc-300 text-lg leading-relaxed italic">&ldquo;{creator.advice}&rdquo;</p>
          </div>

          {/* Gear Used */}
          {creatorGear.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Gear Used</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {creatorGear.map(g => (
                  <Link key={g.slug} href={`/gear/${g.slug}`} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-red-500/30 transition-all group">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold group-hover:text-red-400 transition-colors">{g.name}</h3>
                      <span className="text-green-400 font-bold text-sm">{formatPrice(g.priceUsed)}</span>
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-2">{g.excerpt}</p>
                    <div className="flex gap-1.5 mt-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        g.level === 'beginner' ? 'bg-green-500/20 text-green-400' :
                        g.level === 'mid' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>{g.level}</span>
                      <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">{g.roiScore} ROI</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Started With Detail */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Total Starter Investment</h3>
            <p className="text-zinc-300">{creator.startedWith}</p>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
