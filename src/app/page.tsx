import { Metadata } from 'next';
import Nav from '@/components/Nav';
import GearGrid from '@/components/GearGrid';
import CreatorShowcase from '@/components/CreatorShowcase';
import RoiCalculator from '@/components/RoiCalculator';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { gearList } from '@/data/gear';
import { articles } from '@/data/articles';
import { creators } from '@/data/creators';

export const metadata: Metadata = {
  title: 'GearUp Malaysia — Camera & Gear Reviews for Malaysian Content Creators | ROI in Ringgit',
  description: 'Tim and Ahmad lost their jobs. This site shows them — and you — how to start content creation with zero budget. Compare cameras, drones, Insta360, and mobile gear with real second-hand prices in Malaysia. See what creators actually earn.',
  openGraph: {
    title: 'GearUp Malaysia — Gear That Pays For Itself',
    description: 'Lost your job? Start creating. Compare second-hand camera prices, creator earnings, and ROI in Ringgit Malaysia.',
    type: 'website',
    locale: 'en_MY',
    siteName: 'GearUp Malaysia',
  },
  keywords: ['content creation malaysia', 'camera review malaysia', 'second hand camera malaysia', 'nikon d3100 malaysia', 'sony a6100 used price', 'insta360 x4 malaysia', 'dji mini 4 pro price malaysia', 'creator gear roi', 'tim and ahmad', 'content creator job malaysia'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://gearup.my' },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'GearUp Malaysia',
        url: 'https://gearup.my',
        description: 'Camera and content creation gear reviews for Malaysian creators. Compare prices, earnings, and ROI.',
        inLanguage: 'en-MY',
      },
      {
        '@type': 'ItemList',
        name: 'Malaysian Content Creation Gear Reviews',
        description: 'Second-hand gear prices and reviews for Malaysian creators',
        itemListElement: gearList.map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: g.name,
            description: g.excerpt,
            offers: {
              '@type': 'Offer',
              price: g.priceUsed || g.priceNew,
              priceCurrency: 'MYR',
              availability: 'https://schema.org/UsedCondition',
            },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the cheapest camera to start content creation in Malaysia?',
            acceptedAnswer: { '@type': 'Answer', text: 'The Nikon D3100, available second-hand for RM300-500. It shoots 1080p video and works with cheap F-mount lenses.' },
          },
          {
            '@type': 'Question',
            name: 'How much can a content creator earn in Malaysia?',
            acceptedAnswer: { '@type': 'Answer', text: 'Beginner creators earn RM1,500-3,000/month. Mid-level creators with a used mirrorless camera earn RM3,000-6,000/month.' },
          },
          {
            '@type': 'Question',
            name: 'Do I need a license to fly a drone in Malaysia?',
            acceptedAnswer: { '@type': 'Answer', text: 'Drones under 250g like the DJI Mini 4 Pro do not require a CAAM license. Heavier drones like the Mavic 3 do.' },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      {/* HERO */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-zinc-950 to-purple-950/20 pointer-events-none" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 font-semibold mb-6">
              <span>🇲🇾</span> Made for Malaysian creators
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6">
              Tim & Ahmad
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">
                Lost Their Jobs
              </span>
              <br />
              They Started Creating.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
              No savings. No gear. No experience. Just a phone, a RM400 used Nikon D3100, and the courage to hit record.
              <strong className="text-white"> Now they earn more than their old salary.</strong>
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="#gear" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300">
                Find Your Gear →
              </Link>
              <Link href="/blog/content-creator-malaysia-no-money-start" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800/50 text-white font-bold rounded-xl text-lg border border-zinc-700/50 hover:bg-zinc-800 transition-all duration-300">
                Read Their Guide
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 md:gap-10">
              <div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">RM 0</div>
                <div className="text-sm text-zinc-500">Minimum to start</div>
              </div>
              <div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">{gearList.length}</div>
                <div className="text-sm text-zinc-500">Gear reviewed</div>
              </div>
              <div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{creators.length}</div>
                <div className="text-sm text-zinc-500">Creator stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE STRIP */}
      <section className="py-12 border-y border-zinc-800/50 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: 'I started with RM400 and a Nikon D3100 from Mudah.my. Now I earn RM2,000/month reviewing cars.', name: 'Aiman Roslan', roi: '500% ROI in 90 days' },
              { text: 'My iPhone paid for itself in brand deals. I never bought a camera. Zero ringgit spent on gear.', name: 'Aina Syazwani', roi: 'Unlimited (used what she had)' },
              { text: 'RM1,900 used Insta360 X4. First month I earned RM2,400 from real estate videos. Paid off + profit.', name: 'Zamri Nasir', roi: '126% ROI in Month 1' },
            ].map((t, i) => (
              <div key={i} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-6">
                <div className="text-5xl mb-2 text-red-500/30 font-serif leading-none">&ldquo;</div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">{t.text}</p>
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-xs text-green-400 font-semibold">{t.roi}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GearGrid />
      <CreatorShowcase />
      <RoiCalculator />

      {/* BLOG PREVIEW */}
      <section className="py-16 md:py-24 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Guides & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Inspiration</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">In-depth articles to help Tim, Ahmad, and you succeed as a content creator in Malaysia.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((a, i) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group block bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300"
              >
                <div className="h-44 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-5xl">
                  {a.category === 'guide' ? '📖' : a.category === 'comparison' ? '⚔️' : a.category === 'inspiration' ? '💡' : '🔧'}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded font-semibold uppercase">{a.category}</span>
                    <span className="text-xs text-zinc-500">{a.readTime} min read</span>
                  </div>
                  <h3 className="font-bold group-hover:text-green-400 transition-colors mb-2">{a.title}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">{a.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium">
              Read all articles →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Your Gear Should <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">Pay For Itself</span>
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8 text-lg">
                Tim and Ahmad started with nothing. You can too. Compare gear, read creator stories, calculate your ROI.
              </p>
              <Link href="#gear" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300">
                Start Your Journey →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
