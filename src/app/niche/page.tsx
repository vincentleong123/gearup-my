import { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { niches } from '@/data/niches';
import { nicheImg } from '@/data/images';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Content Creation Niches in Malaysia — Find Your Path | Kameralog MY',
  description: 'Explore content creation niches popular in Malaysia. Food review, tech review, beauty, travel, automotive, and daily vlog — with gear recommendations and earning potential.',
  openGraph: { title: 'Content Niches — Kameralog Malaysia' },
  alternates: { canonical: 'https://kameralog.com/niche' },
};

export default function NichesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Content Creation Niches for Malaysia',
    itemListElement: niches.map((n, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CollectionPage',
        name: `${n.title} Content Creation Guide`,
        url: `https://kameralog.com/niche/${n.slug}`,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">Content Niche</span>
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-lg">
              Not sure what content to make? Pick a niche below. We show you the gear, the tips, and how much you can earn in Malaysia.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {niches.map(n => (
              <Link
                key={n.slug}
                href={`/niche/${n.slug}`}
                className="group block bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300"
              >
                <div className="h-40 relative overflow-hidden bg-zinc-900">
                  <img
                    src={nicheImg(n.slug)}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-3xl">{n.image}</div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold group-hover:text-red-400 transition-colors mb-2">{n.title}</h2>
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{n.tagline}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-zinc-500">Start from</span>
                      <div className="font-bold text-green-400">{n.starterCost === 0 ? 'RM 0 (Your phone)' : formatPrice(n.starterCost)}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-500">Earn up to</span>
                      <div className="font-bold text-cyan-400">{n.earningPotential}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
