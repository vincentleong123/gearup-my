import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CurationWall from '@/components/CurationWall';
import { gigs, getGigBySlug, difficultyMeta } from '@/data/gigs';
import { gearList } from '@/data/gear';
import { articles } from '@/data/articles';
import { gigImg, gearImg } from '@/data/images';
import { gigTopic } from '@/lib/curation';
import { formatPrice } from '@/lib/utils';
import { LANGS } from '@/i18n/langs';
import { langAlternates, withLang } from '@/lib/lang';

interface Props { params: Promise<{ lang: string; slug: string }> }

export async function generateStaticParams() {
  return LANGS.flatMap(lang => gigs.map(g => ({ lang, slug: g.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const gig = getGigBySlug(slug);
  if (!gig) return {};
  return {
    title: `${gig.title} in Malaysia — Rates, Gear & How to Get Gigs | Kameralog MY`,
    description: `How to start ${gig.title.toLowerCase()} in Malaysia. Real 2026 rates (RM ${gig.rateMin.toLocaleString()}-${gig.rateMax.toLocaleString()} per gig), the minimal gear you need, hashtags to search, and a path to pay off your camera.`,
    openGraph: {
      title: `${gig.emoji} ${gig.title} — Kameralog Malaysia`,
      description: gig.tagline,
    },
    ...langAlternates(lang, `/gigs/${gig.slug}`),
  };
}

export default async function GigPage({ params }: Props) {
  const { lang, slug } = await params;
  const gig = getGigBySlug(slug);
  if (!gig) notFound();

  const starterGear = gearList.filter(g => gig.starterGearSlugs.includes(g.slug));
  const upgradeGear = gearList.filter(g => gig.upgradeGearSlugs.includes(g.slug));
  const cheapestStarter = starterGear.length ? starterGear.reduce((a, b) => (a.priceUsed <= b.priceUsed ? a : b)) : null;

  const gigsNeeded = cheapestStarter && cheapestStarter.priceUsed > 0
    ? Math.ceil(cheapestStarter.priceUsed / gig.rateMax)
    : 0;

  const relatedArticles = articles.filter(a =>
    a.tags.some(t => ['graduation', 'wedding', 'event', 'gig', 'side', 'content', 'money', 'roi'].includes(t)) &&
    a.content.toLowerCase().includes(gig.title.split(' ')[0].toLowerCase())
  ).slice(0, 3);

  const topic = gigTopic(gig);
  const level = difficultyMeta[gig.difficulty];

  return (
    <>
      <Nav />
      <article className="min-h-screen pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href={withLang(lang, '/')} className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={withLang(lang, '/gigs')} className="hover:text-white transition-colors">Gigs</Link>
            <span>/</span>
            <span className="text-zinc-100">{gig.title}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <div className="h-56 md:h-72 rounded-2xl overflow-hidden relative mb-8 bg-zinc-900">
              <img src={gigImg(gig.slug)} alt={gig.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 text-6xl drop-shadow-lg">{gig.emoji}</div>
              <div className="absolute top-4 right-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${level.color} backdrop-blur`}>{level.label}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider">Gig Opportunity</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">{gig.title}</h1>
            <p className="text-xl text-amber-400/90 font-semibold mb-4">{gig.tagline}</p>
            <p className="text-zinc-200 leading-relaxed text-lg">{gig.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Per gig rate</span>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {gig.rateMin === gig.rateMax ? `RM ${gig.rateMin.toLocaleString()}` : `RM ${gig.rateMin.toLocaleString()}–${gig.rateMax.toLocaleString()}`}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{gig.rateUnit}</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Time per gig</span>
              <div className="text-2xl font-black mt-1">{gig.timeEstimate}</div>
              <div className="text-xs text-zinc-500 mt-1">shoot + edit</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Peak season</span>
              <div className="text-sm font-bold mt-2 leading-snug">{gig.peakSeason}</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Demand</span>
              <div className="text-sm font-bold mt-2 leading-snug text-green-400">{gig.demand}</div>
            </div>
          </div>

          {/* Starter kit + payoff maths */}
          <div className="grid md:grid-cols-5 gap-6 mb-10">
            <div className="md:col-span-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-1">🛠️ Minimal kit to start</h2>
              <p className="text-zinc-500 text-sm mb-4">The cheapest honest way to start this gig. Upgrade only when income arrives.</p>
              <div className="space-y-3">
                {starterGear.map(g => (
                  <Link key={g.slug} href={withLang(lang, `/gear/${g.slug}`)} className="flex items-center gap-3 bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 hover:border-amber-500/40 transition-all group">
                    <img src={gearImg(g.slug)} alt={g.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold group-hover:text-amber-400 transition-colors">{g.name}</div>
                      <div className="text-xs text-zinc-500">{g.type} · ROI {g.roiScore}/100</div>
                    </div>
                    <div className="text-green-400 font-black flex-shrink-0">{formatPrice(g.priceUsed)}</div>
                  </Link>
                ))}
              </div>
              {upgradeGear.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-2">Level-up later</div>
                  <div className="flex flex-wrap gap-2">
                    {upgradeGear.map(g => (
                      <Link key={g.slug} href={withLang(lang, `/gear/${g.slug}`)} className="text-xs text-amber-400/90 bg-amber-500/5 border border-amber-500/20 px-2.5 py-1.5 rounded-lg hover:bg-amber-500/10 transition-colors">
                        {g.name} · {formatPrice(g.priceUsed)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 flex flex-col">
              <h2 className="text-xl font-bold text-amber-400 mb-3">🧮 The payoff maths</h2>
              {cheapestStarter && cheapestStarter.priceUsed > 0 ? (
                <>
                  <p className="text-zinc-100 text-sm leading-relaxed mb-4">
                    Start with the <strong className="text-white">{cheapestStarter.name}</strong> at{' '}
                    <strong className="text-amber-400">{formatPrice(cheapestStarter.priceUsed)}</strong> second-hand. At up to{' '}
                    <strong className="text-amber-400">RM {gig.rateMax.toLocaleString()}</strong> per {gig.rateUnit}, that&apos;s
                  </p>
                  <div className="text-center py-4 mb-3">
                    <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{gigsNeeded}</div>
                    <div className="text-zinc-200 mt-1 font-semibold">{gig.title.toLowerCase()} gig{gigsNeeded > 1 ? 's' : ''}</div>
                    <div className="text-xs text-zinc-500 mt-1">to own it free &amp; clear</div>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed mt-auto">
                    Do one a weekend and it&apos;s paid off in under a month — then every gig after is profit.
                  </p>
                </>
              ) : (
                <p className="text-zinc-100 text-sm leading-relaxed">
                  Start with what you already own — likely a phone. This gig can begin today at RM0. Earn the deposit, then grab the gear that makes it easier.
                </p>
              )}
              <Link href={withLang(lang, `/gear${cheapestStarter ? '/' + cheapestStarter.slug : ''}`)} className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold rounded-xl text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all">
                {cheapestStarter ? `Read the ${cheapestStarter.name} review` : 'Browse gear'} →
              </Link>
            </div>
          </div>

          {/* What you deliver */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">📦 What you deliver</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {gig.deliverables.map((d, i) => (
                <div key={i} className="flex items-start gap-3 bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4">
                  <span className="text-amber-400 mt-0.5">✓</span>
                  <span className="text-zinc-100">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to get gigs + tips */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">🎯 How to get your first gigs</h2>
              <div className="space-y-3">
                {gig.howToGetGigs.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4">
                    <span className="text-amber-400 font-black flex-shrink-0">{i + 1}.</span>
                    <span className="text-zinc-100 text-sm leading-relaxed">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">💡 Pro tips</h2>
              <div className="space-y-3">
                {gig.tips.map((t, i) => (
                  <div key={i} className="flex items-start gap-3 bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4">
                    <span className="text-cyan-400 mt-0.5">💡</span>
                    <span className="text-zinc-100 text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sample gig */}
          <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/25 rounded-2xl p-6 md:p-8 mb-10">
            <h2 className="text-xl font-bold text-amber-400 mb-4">🏆 Real example</h2>
            <div className="font-black text-lg mb-2">{gig.sampleGig.headline}</div>
            <p className="text-zinc-100 leading-relaxed mb-4">{gig.sampleGig.story}</p>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl text-amber-400 font-bold">
              {gig.sampleGig.earnings}
            </div>
          </div>

          {/* Curation wall */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-2">🎛️ Live inspiration for this gig</h2>
            <p className="text-zinc-500 text-sm mb-4">
              Auto-curated imagery plus live links to Google, Instagram, TikTok and YouTube searches for this niche. Hit Surprise me.
            </p>
            <CurationWall topics={[topic]} title={`${gig.emoji} ${gig.title}`} />
          </div>

          {/* Hashtag quick links */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">#️⃣ Hashtags to mine</h2>
            <p className="text-zinc-500 text-sm mb-4">Steal ideas from these live social tags — follow the top posts, note what pays, replicate it locally.</p>
            <div className="flex flex-wrap gap-2">
              {gig.hashtags.map(t => (
                <a
                  key={t}
                  href={`https://www.instagram.com/explore/tags/${encodeURIComponent(t.replace('#', ''))}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-400 bg-cyan-500/5 border border-cyan-500/20 px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 transition-colors"
                >
                  #{t}
                </a>
              ))}
            </div>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">📚 Related guides</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedArticles.map(a => (
                  <Link key={a.slug} href={withLang(lang, `/blog/${a.slug}`)} className="block bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-amber-500/40 transition-all group">
                    <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-2">{a.category}</div>
                    <div className="font-bold text-sm group-hover:text-amber-400 transition-colors mb-2">{a.title}</div>
                    <div className="text-xs text-zinc-500">{a.readTime} min read</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black mb-2">Ready to earn?</h2>
            <p className="text-zinc-200 mb-6">Find the exact gear for this gig with the Gear Match quiz, or explore every gig in one wall.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={withLang(lang, '/quiz')} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all">
                🎯 Gear Match Quiz
              </Link>
              <Link href={withLang(lang, '/curate')} className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800/50 text-white font-bold rounded-xl border border-zinc-700/50 hover:bg-zinc-800 transition-all">
                🔥 All gigs inspiration wall
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
