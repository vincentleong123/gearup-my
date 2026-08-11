import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { T } from '@/components/T';
import { BASE_URL, langAlternates, withLang } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'About Kameralog — Honest Gear Reviews for Malaysian Creators | Kameralog MY',
    description:
      'Kameralog is a Malaysian camera and gear review journal built on a simple idea: gear should pay for itself. Real second-hand prices, honest ROI scores, and gig rates you can actually earn.',
    ...langAlternates(lang, '/about'),
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Kameralog Malaysia',
    description: 'Honest camera and gear reviews for Malaysian content creators. Gig-to-Gear: gear that pays for itself.',
    url: `${BASE_URL}${withLang(lang, '/about')}`,
  };

  const values = [
    { key: 'about.values.1t', en: '🪙 Gear must pay for itself', d: 'about.values.1d', den: "ROI scoring is the core of every review. If it can't earn its keep through Malaysian gigs, we say so." },
    { key: 'about.values.2t', en: '📉 Real Malaysian prices', d: 'about.values.2d', den: "We compare real second-hand prices in the Malaysian market — not international prices that don't apply." },
    { key: 'about.values.3t', en: '🤝 No bought opinions', d: 'about.values.3d', den: 'We accept review units and advertising, but never payment for a score or verdict. Everything sponsored is labelled.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 text-sm text-pink-400 font-semibold mb-5">
              <T k="about.badge" en="📖 About Kameralog" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              <T k="about.head" en="Gear that" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-fuchsia-500"><T k="about.headAccent" en="pays for itself" /></span>
            </h1>
            <p className="text-zinc-200 text-lg leading-relaxed">
              <T k="about.desc" en="Kameralog is a Malaysian camera and gear review journal. We review gear the way a working Malaysian creator actually uses it — for gigs, side hustles, and content that brings in money." />
            </p>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none space-y-8 mb-16">
            <section>
              <h2 className="text-2xl font-bold"><T k="about.what.t" en="What we do" /></h2>
              <p className="text-zinc-200 leading-relaxed"><T k="about.what.d" en="Every review answers one question: how fast does this gear pay for itself? We score ROI, compare second-hand prices in Malaysia (from Mudah.my, Carousell, and shops), and tie each recommendation to a real gig you can take — graduation shoots, event coverage, real estate video, and more." /></p>
            </section>

            <section>
              <h2 className="text-2xl font-bold"><T k="about.who.t" en="Who this is for" /></h2>
              <p className="text-zinc-200 leading-relaxed"><T k="about.who.d" en="Students, fresh grads, and anyone building a side income with a camera. If you&rsquo;re deciding whether to spend RM2,000 on your first serious camera, or which lens to buy next, we do the math for you first." /></p>
            </section>

            <section>
              <h2 className="text-2xl font-bold"><T k="about.story.t" en="The story" /></h2>
              <p className="text-zinc-200 leading-relaxed"><T k="about.story.d" en="Kameralog started life as a personal log of cameras we wished we could buy. Over time it became something more useful: a record of what Malaysian creators actually use, what gigs actually pay, and which gear actually earns its keep. Today it&rsquo;s a full review journal in English, Bahasa Melayu, and 中文." /></p>
            </section>
          </div>

          <h2 className="text-2xl md:text-3xl font-black mb-8"><T k="about.valuesHead" en="What we stand for" /></h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {values.map(v => (
              <div key={v.key} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-bold mb-2"><T k={v.key} en={v.en} /></h3>
                <p className="text-sm text-zinc-200"><T k={v.d} en={v.den} /></p>
              </div>
            ))}
          </div>

          <div className="gradient-border rounded-3xl bg-zinc-900/70 p-8 md:p-10 text-center">
            <h2 className="text-2xl font-black mb-3"><T k="about.cta.t" en="Got a gear question?" /></h2>
            <p className="text-zinc-200 mb-6"><T k="about.cta.d" en="We answer reader questions in the blog and on new reviews." /></p>
            <a
              href="mailto:hello@kameralog.com?subject=Question%20for%20Kameralog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-600/25 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <T k="about.cta.btn" en="Email us → hello@kameralog.com" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
