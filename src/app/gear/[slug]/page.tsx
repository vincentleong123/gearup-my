import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { gearList, getGearBySlug } from '@/data/gear';
import { creators } from '@/data/creators';
import { formatPrice, roiColor, roiBarColor, getLevelLabel, h } from '@/lib/utils';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return gearList.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gear = getGearBySlug(slug);
  if (!gear) return {};
  return {
    title: `${gear.name} Review Malaysia ${gear.priceUsed > 0 ? '— Second Hand Price RM' + gear.priceUsed : ''} | GearUp MY`,
    description: gear.excerpt,
    openGraph: {
      title: `${gear.name} Review — GearUp Malaysia`,
      description: gear.excerpt,
    },
    alternates: { canonical: `https://gearup.my/gear/${gear.slug}` },
  };
}

export default async function GearPage({ params }: Props) {
  const { slug } = await params;
  const gear = getGearBySlug(slug);
  if (!gear) notFound();

  const relatedCreators = creators.filter(c => c.gearSlugs.includes(gear.slug));
  const relatedGear = gearList.filter(g => g.category === gear.category && g.slug !== gear.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: gear.name,
    description: gear.excerpt,
    category: gear.category,
    offers: {
      '@type': 'Offer',
      price: gear.priceUsed || gear.priceNew,
      priceCurrency: 'MYR',
      itemCondition: gear.priceUsed > 0 ? 'https://schema.org/UsedCondition' : 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
    review: {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: gear.rating, bestRating: 5 },
      author: { '@type': 'Organization', name: 'GearUp Malaysia' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <article className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/gear" className="hover:text-white transition-colors">Gear</Link>
            <span>/</span>
            <span className="text-zinc-300">{gear.name}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                gear.level === 'beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                gear.level === 'mid' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>{getLevelLabel(gear.level)}</span>
              <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full">{gear.type}</span>
              <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full">★ {gear.rating}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">{gear.name}</h1>
            <p className="text-xl text-zinc-400 leading-relaxed">{gear.excerpt}</p>
          </div>

          {/* Price & ROI Card */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-10">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <span className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Second-Hand Price</span>
                <div className="text-3xl font-black text-green-400 mt-1">{formatPrice(gear.priceUsed)}</div>
                {gear.priceUsed > 0 && <div className="text-xs text-zinc-500 mt-1">Save RM {(gear.priceNew - gear.priceUsed).toLocaleString()} vs new</div>}
              </div>
              <div>
                <span className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">New Price</span>
                <div className="text-3xl font-black mt-1">{formatPrice(gear.priceNew)}</div>
                {gear.priceNew === 0 && <div className="text-xs text-zinc-500 mt-1">Discontinued — buy used only</div>}
              </div>
              <div>
                <span className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">ROI Score</span>
                <div className={`text-3xl font-black mt-1 ${roiColor(gear.roiScore)}`}>{gear.roiScore}/100</div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-2">
                  <div className={`h-full rounded-full ${roiBarColor(gear.roiScore)}`} style={{ width: `${gear.roiScore}%` }} />
                </div>
              </div>
            </div>
            <div className="border-t border-zinc-800 mt-6 pt-6">
              <p className="text-zinc-400">💰 {gear.roiDesc}</p>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Sensor', value: gear.sensor },
              { label: 'Video', value: gear.video },
              { label: 'Weight', value: gear.weight },
              { label: 'Type', value: gear.type },
            ].map(s => (
              <div key={s.label} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4">
                <div className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">{s.label}</div>
                <div className="font-bold text-sm">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Full Review */}
          <div className="prose prose-invert prose-zinc max-w-none mb-10">
            {gear.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace(/\*\*/g, '')}</h3>;
              }
              if (line.startsWith('- **')) {
                const match = line.match(/- \*\*(.+?)\*\*(.*)/);
                if (match) {
                  return <li key={i} className="text-zinc-300 mb-1"><strong>{match[1]}</strong>{match[2]}</li>;
                }
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="text-zinc-300 mb-1">{line.slice(2)}</li>;
              }
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="text-zinc-300 leading-relaxed mb-3">{line}</p>;
            })}
          </div>

          {/* Used Buying Tip */}
          {gear.usedTip && (
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6 mb-10">
              <h3 className="font-bold text-yellow-400 mb-2">💡 Second-Hand Buying Tip</h3>
              <p className="text-zinc-300">{gear.usedTip}</p>
            </div>
          )}

          {/* Pros/Cons */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-3 uppercase text-sm tracking-wider">Pros</h3>
              <ul className="space-y-2">
                {gear.pros.map(p => <li key={p} className="text-zinc-300 flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> {p}</li>)}
              </ul>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
              <h3 className="font-bold text-red-400 mb-3 uppercase text-sm tracking-wider">Cons</h3>
              <ul className="space-y-2">
                {gear.cons.map(c => <li key={c} className="text-zinc-300 flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> {c}</li>)}
              </ul>
            </div>
          </div>

          {/* Creators using this gear */}
          {relatedCreators.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Creators Using This Gear</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedCreators.map(c => (
                  <Link key={c.slug} href={`/creators/${c.slug}`} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-cyan-500/30 transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-sm font-bold text-cyan-400">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold group-hover:text-cyan-400 transition-colors">{c.name}</div>
                        <div className="text-sm text-zinc-500">{c.niche} · RM{c.monthlyEarningsMin.toLocaleString()}+/mo</div>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-2">&ldquo;{h(c.advice.slice(0, 100))}&rdquo;</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Gear */}
          {relatedGear.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Compare with Similar Gear</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedGear.map(g => (
                  <Link key={g.slug} href={`/gear/${g.slug}`} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 hover:border-red-500/30 transition-all group text-center">
                    <div className="text-3xl mb-2">{g.category === 'camera' ? '📷' : g.category === 'mobile' ? '📱' : g.category === 'drone' ? '🛸' : '🎥'}</div>
                    <div className="font-bold group-hover:text-red-400 transition-colors text-sm">{g.name}</div>
                    <div className="text-green-400 font-bold mt-1">{formatPrice(g.priceUsed)}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </>
  );
}
