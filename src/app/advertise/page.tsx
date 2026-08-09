import { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Advertise with Kameralog — Media Kit & Ad Rates for Malaysian Brands | Kameralog MY',
  description:
    'Reach 2,300+ Malaysian camera and content-creation enthusiasts monthly. Transparent ad formats, honest audience metrics, and self-serve booking. Media kit for 2026.',
  alternates: { canonical: 'https://kameralog.com/advertise' },
};

const formats = [
  {
    name: 'Banner Ad',
    format: '728×90 · 970×250',
    price: 'RM400 / month',
    detail: 'Runs on every gear review, blog post, and gig page. Simple, visible, direct.',
  },
  {
    name: 'Featured Gear Placement',
    format: 'Editorial slot',
    price: 'RM900 / month',
    detail: 'Your product featured inside our "Editors\' Picks" strip with a review link and badge.',
  },
  {
    name: 'Sponsored Review',
    format: 'Full article',
    price: 'RM1,800 / post',
    detail: 'A full, clearly-labelled review written to our honest editorial standards. No "5-star for money" nonsense.',
  },
  {
    name: 'Newsletter / Spotlight',
    format: 'Email spot',
    price: 'RM250 / send',
    detail: 'Featured mention to our engaged monthly email. Coming soon — first 10 partners get launch pricing.',
  },
];

const stats = [
  { value: '2,300+', label: 'Monthly readers' },
  { value: '38', label: 'Gear reviews live' },
  { value: '34', label: 'Guides & comparisons' },
  { value: '75%', label: 'From Malaysia' },
];

export default function AdvertisePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Advertise with Kameralog Malaysia',
    description: 'Media kit, ad formats and transparent audience metrics for advertisers on Kameralog Malaysia.',
    url: 'https://kameralog.com/advertise',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 text-sm text-pink-400 font-semibold mb-5">
              📢 Advertise with Kameralog
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Reach the creators who <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-fuchsia-500">buy and recommend</span> your gear
            </h1>
            <p className="text-zinc-200 text-lg leading-relaxed">
              Kameralog is where Malaysian photographers, vloggers and side-hustle creators decide what to buy.
              Transparent metrics, honest editorial, and rates that make sense for local brands.
            </p>
            <a
              href="mailto:ads@kameralog.com?subject=Advertising%20with%20Kameralog"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-600/25 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a slot → ads@kameralog.com
            </a>
          </div>

          {/* Audience stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map(s => (
              <div key={s.label} className="gradient-border rounded-2xl bg-zinc-900/70 p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">
                  {s.value}
                </div>
                <div className="text-sm text-zinc-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Formats */}
          <h2 className="text-2xl md:text-3xl font-black mb-8">Ad formats &amp; honest rates</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {formats.map(f => (
              <div key={f.name} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 hover:border-pink-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold">{f.name}</h3>
                  <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">{f.price}</span>
                </div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{f.format}</p>
                <p className="text-sm text-zinc-200">{f.detail}</p>
              </div>
            ))}
          </div>

          {/* Honesty section */}
          <div className="gradient-border rounded-3xl bg-zinc-900/70 p-8 md:p-10 mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Why advertisers trust us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-2">🔒 No inflated numbers</h3>
                <p className="text-sm text-zinc-200">
                  Our &quot;2,300+ readers&quot; is honest, verified traffic — not a vanity stat. We share real numbers before you book.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">🖊️ Editorial stays independent</h3>
                <p className="text-sm text-zinc-200">
                  Sponsored reviews are always labelled. If a product is bad, we say so — that&apos;s why our readers trust our recommendations.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">🇲🇾 Malaysian first</h3>
                <p className="text-sm text-zinc-200">
                  Prices in ringgit, stores that ship to Malaysia, and creators like your actual customers.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center">Common questions</h2>
            <div className="space-y-4">
              <details className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Can I see real traffic numbers before booking?
                  <span className="text-pink-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-zinc-200 mt-3">
                  Yes — email us and we&apos;ll share current analytics (sessions, pageviews, geography) so you know exactly what you&apos;re buying.
                </p>
              </details>
              <details className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  How does sponsored content stay honest?
                  <span className="text-pink-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-zinc-200 mt-3">
                  Every sponsored post carries a visible disclosure. We keep our scoring (ROI score, pros/cons) genuine — readers stay because we don&apos;t flatter products.
                </p>
              </details>
              <details className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Do you accept affiliate links or exchanges?
                  <span className="text-pink-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-zinc-200 mt-3">
                  Cash first, always. Products for review are fine, but ads and sponsored posts are paid placements. Contact us to discuss.
                </p>
              </details>
            </div>
            <div className="text-center mt-10">
              <p className="text-zinc-500 text-sm mb-3">Prefer to talk first? Email us and we&apos;ll reply within 48 hours.</p>
              <Link href="/" className="text-pink-400 hover:text-pink-300 font-semibold underline underline-offset-2">← Back to Kameralog</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
