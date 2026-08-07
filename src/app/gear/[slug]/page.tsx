import { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { gearList, getGearBySlug } from '@/data/gear';
import { creators } from '@/data/creators';
import { gearImg, gearPhotoCredit } from '@/data/images';
import ScenarioGallery from '@/components/ScenarioGallery';
import PayoffPath from '@/components/PayoffPath';
import Figure from '@/components/Figure';
import { gearFigures } from '@/data/curated';
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
    title: `${gear.name} Review Malaysia ${gear.priceUsed > 0 ? '— Second Hand Price RM' + gear.priceUsed : ''} | Kameralog MY`,
    description: gear.excerpt,
    openGraph: {
      title: `${gear.name} Review — Kameralog Malaysia`,
      description: gear.excerpt,
    },
    alternates: { canonical: `https://kameralog.com/gear/${gear.slug}` },
  };
}

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`${className} ${i < Math.round(rating) ? 'text-amber-400' : 'text-zinc-700'}`} fill="currentColor">
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.28 3.95a1 1 0 00.95.69h4.15c.97 0 1.37 1.24.59 1.81l-3.36 2.44a1 1 0 00-.36 1.12l1.28 3.95c.3.92-.76 1.69-1.54 1.12l-3.36-2.44a1 1 0 00-1.18 0l-3.36 2.44c-.78.57-1.84-.2-1.54-1.12l1.28-3.95a1 1 0 00-.36-1.12L2.08 9.38c-.78-.57-.38-1.81.59-1.81h4.15a1 1 0 00.95-.69l1.28-3.95z" />
        </svg>
      ))}
    </span>
  );
}

export default async function GearPage({ params }: Props) {
  const { slug } = await params;
  const gear = getGearBySlug(slug);
  if (!gear) notFound();

  const relatedCreators = creators.filter(c => c.gearSlugs.includes(gear.slug));
  const relatedGear = gearList.filter(g => g.category === gear.category && g.slug !== gear.slug).slice(0, 3);
  const isTopPick = gear.roiScore >= 90;
  const scorePct = (gear.rating / 5) * 100;

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
      author: { '@type': 'Organization', name: 'Kameralog Malaysia' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <article className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/gear" className="hover:text-white transition-colors">Gear Reviews</Link>
            <span>/</span>
            <span className="text-zinc-300">{gear.name}</span>
          </nav>

          {/* Review header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 uppercase">{gear.category} Review</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                gear.level === 'beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                gear.level === 'mid' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>{getLevelLabel(gear.level)}</span>
              <span className="text-xs text-zinc-400 bg-zinc-800/70 px-3 py-1 rounded-full">{gear.type}</span>
              {isTopPick && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950">🏆 2026 Editor&apos;s Choice</span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">{gear.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="flex items-center gap-2">
                <Stars rating={gear.rating} />
                <span className="font-black text-lg">{gear.rating.toFixed(1)}</span>
                <span className="text-sm text-zinc-500">/ 5</span>
              </span>
              <span className="text-sm text-zinc-500">·</span>
              <span className="text-sm text-zinc-400">Reviewed by the Kameralog team · 2026 Edition</span>
            </div>
            <p className="text-xl text-zinc-400 leading-relaxed">{gear.excerpt}</p>
          </div>

          {/* Gear hero image */}
          <div className="gradient-border rounded-2xl overflow-hidden mb-6">
            <div className="relative aspect-[16/9] bg-zinc-900">
              <img
                src={gearImg(gear.slug)}
                alt={`${gear.name} — ${gear.type} review`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-950/70 backdrop-blur-sm text-cyan-300 border border-cyan-400/20">{gear.type}</span>
                {gear.priceUsed > 0 && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
                    Used {formatPrice(gear.priceUsed)}
                  </span>
                )}
              </div>
            </div>
            {(() => {
              const credit = gearPhotoCredit(gear.slug);
              if (!credit) return null;
              return (
                <a
                  href={credit.page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center gap-2 px-3 py-1.5 text-[10px] text-zinc-500 hover:text-zinc-300 bg-zinc-950/50"
                >
                  <span>Photo: {credit.artist} · {credit.license}</span>
                  <span>Wikimedia Commons ↗</span>
                </a>
              );
            })()}
          </div>

          {/* Scoreboard card */}
          <div className="gradient-border rounded-2xl bg-zinc-900/70 p-6 md:p-8 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              <div className="flex flex-col items-center justify-center text-center">
                <div
                  className="grid place-items-center h-24 w-24 rounded-full relative mb-2"
                  style={{ background: `conic-gradient(#f59e0b ${scorePct}%, #27272a 0)` }}
                >
                  <div className="grid place-items-center h-[74px] w-[74px] rounded-full bg-zinc-950">
                    <span className="text-3xl font-black text-amber-400">{gear.rating.toFixed(1)}</span>
                  </div>
                </div>
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Our Rating</span>
              </div>
              <div>
                <span className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">ROI Score</span>
                <div className={`text-3xl font-black mt-1 ${roiColor(gear.roiScore)}`}>{gear.roiScore}/100</div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-2">
                  <div className={`h-full rounded-full ${roiBarColor(gear.roiScore)}`} style={{ width: `${gear.roiScore}%` }} />
                </div>
                <div className="text-[11px] text-zinc-500 mt-1.5">How fast it pays itself off</div>
              </div>
              <div>
                <span className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Second-Hand Price</span>
                <div className="text-2xl font-black text-green-400 mt-1">{formatPrice(gear.priceUsed)}</div>
                {gear.priceUsed > 0 && gear.priceNew > 0 && (
                  <div className="text-xs text-zinc-500 mt-1">Save RM {(gear.priceNew - gear.priceUsed).toLocaleString()} vs new</div>
                )}
              </div>
              <div>
                <span className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">New Price</span>
                <div className="text-2xl font-black mt-1">{formatPrice(gear.priceNew)}</div>
                {gear.priceNew === 0 && <div className="text-xs text-zinc-500 mt-1">Discontinued — buy used only</div>}
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🧾</span>
              <div>
                <h2 className="font-black text-lg mb-1.5">Bottom Line</h2>
                <p className="text-zinc-300 leading-relaxed">{gear.roiDesc}</p>
              </div>
            </div>
          </div>

          {/* How to pay it off */}
          <PayoffPath gear={gear} />

          {/* Specs */}
          <h2 className="text-2xl font-black mb-4">Key Specs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Sensor', value: gear.sensor },
              { label: 'Video', value: gear.video },
              { label: 'Weight', value: gear.weight },
              { label: 'Type', value: gear.type },
            ].map(s => (
              <div key={s.label} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 hover:border-zinc-700 transition-colors">
                <div className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">{s.label}</div>
                <div className="font-bold text-sm">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Full Review */}
          <h2 className="text-2xl font-black mb-4">Full Review</h2>
          <div className="prose prose-invert prose-zinc max-w-none mb-10">
            {(() => {
              const lines = gear.content.split('\n');
              let sectionCount = 0;
              let figIdx = 0;
              const figures = gearFigures(gear.slug);
              const out: ReactElement[] = [];
              lines.forEach((line, i) => {
                const isHeading = line.startsWith('**') && line.endsWith('**');
                if (isHeading) {
                  sectionCount += 1;
                  if (sectionCount > 1 && figures.length > 0) {
                    const fig = figures[figIdx % figures.length];
                    figIdx += 1;
                    out.push(<Figure key={`fig-${i}`} figure={fig} />);
                  }
                  out.push(<h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace(/\*\*/g, '')}</h3>);
                  return;
                }
                if (line.startsWith('- **')) {
                  const match = line.match(/- \*\*(.+?)\*\*(.*)/);
                  if (match) {
                    out.push(<li key={i} className="text-zinc-300 mb-1"><strong>{match[1]}</strong>{match[2]}</li>);
                  }
                  return;
                }
                if (line.startsWith('- ')) {
                  out.push(<li key={i} className="text-zinc-300 mb-1">{line.slice(2)}</li>);
                  return;
                }
                if (line.trim() === '') { out.push(<br key={i} />); return; }
                out.push(<p key={i} className="text-zinc-300 leading-relaxed mb-3">{line}</p>);
              });
              return out;
            })()}
          </div>

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

          {/* Used Buying Tip */}
          {gear.usedTip && (
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6 mb-10">
              <h3 className="font-bold text-yellow-400 mb-2">💡 Second-Hand Buying Tip</h3>
              <p className="text-zinc-300">{gear.usedTip}</p>
              <Link
                href="/blog/used-camera-buying-guide-malaysia-mudah-carousell"
                className="inline-flex items-center gap-1.5 mt-3 text-sm text-yellow-300 hover:text-yellow-200 font-semibold transition-colors"
              >
                Read the full used-camera buying checklist →
              </Link>
            </div>
          )}

          {/* Scenario gallery */}
          <ScenarioGallery gearSlug={gear.slug} />

          {/* Creators using this gear */}
          {relatedCreators.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-black mb-6">Creators Using This Gear</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedCreators.map(c => (
                  <Link key={c.slug} href={`/creators/${c.slug}`} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-cyan-500/30 hover:-translate-y-0.5 transition-all group">
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Compare with Similar Gear</h2>
                <Link href="/compare" className="text-sm text-zinc-400 hover:text-white font-semibold transition-colors">
                  Open Compare tool →
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedGear.map(g => (
                  <Link key={g.slug} href={`/gear/${g.slug}`} className="group block bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/5 transition-all">
                    <div className="h-32 relative overflow-hidden bg-zinc-800">
                      <img
                        src={gearImg(g.slug)}
                        alt={g.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                        <Stars rating={g.rating} className="h-3 w-3" />
                        <span className="text-[10px] font-bold text-amber-400">{g.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="p-3.5">
                      <div className="font-bold group-hover:text-red-400 transition-colors text-sm">{g.name}</div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-green-400 font-bold">{formatPrice(g.priceUsed)}</span>
                        <span className="text-[10px] font-bold text-zinc-500">{g.roiScore} ROI</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sticky-CTA strip */}
          <div className="gradient-border rounded-2xl bg-zinc-900/70 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-black text-lg">{gear.name} — worth it in 2026?</div>
              <div className="text-sm text-zinc-400">{gear.rating.toFixed(1)}/5 rating · {gear.roiScore}/100 ROI score</div>
            </div>
            <Link
              href="/blog/used-camera-buying-guide-malaysia-mudah-carousell"
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-600/25 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
            >
              Buy used safely →
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
