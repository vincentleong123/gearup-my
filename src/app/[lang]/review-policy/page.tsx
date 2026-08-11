import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { T } from '@/components/T';
import { langAlternates } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Review Policy — How We Test, Score & Disclose | Kameralog MY',
    description:
      'How Kameralog reviews gear: what we test, how ROI scores work, how we handle review units and sponsored posts, and the rules that keep our opinions independent.',
    ...langAlternates(lang, '/review-policy'),
  };
}

export default async function ReviewPolicyPage({ params }: Props) {
  const { lang } = await params;

  const rules = [
    { key: 'policy.r1t', en: '1. Tested in real work', d: 'policy.r1d', den: 'We test gear on real paid gigs — graduations, events, real estate video, vlogs — not just at a desk. If it works in work that pays, that is what counts.' },
    { key: 'policy.r2t', en: '2. Transparent ROI scoring', d: 'policy.r2d', den: 'The ROI score works out how fast the second-hand price (not the MSRP) can be covered by typical Malaysian gig rates. The formula is explained on every review page.' },
    { key: 'policy.r3t', en: '3. Prices tracked over time', d: 'policy.r3d', den: 'Second-hand prices move every month. We update them and date-stamp each change so you can see how the market is trending.' },
    { key: 'policy.r4t', en: '4. No bought grades', d: 'policy.r4d', den: 'Advertisers and sponsors cannot influence a score, a rating, or a verdict. No exceptions.' },
    { key: 'policy.r5t', en: '5. Weaknesses reported openly', d: 'policy.r5d', den: 'Slow autofocus, plastic build, noisy motor — if there is a flaw, we write about it. A good review names what is bad too.' },
    { key: 'policy.r6t', en: '6. Malaysia-specific recommendations', d: 'policy.r6d', den: 'We recommend gear based on availability and price in Malaysia, not just international popularity.' },
  ];

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 text-sm text-pink-400 font-semibold mb-5">
              <T k="policy.badge" en="📜 Review Policy" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              <T k="policy.head" en="Our promise on" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-fuchsia-500"><T k="policy.headAccent" en="every review" /></span>
            </h1>
            <p className="text-zinc-200 text-lg leading-relaxed max-w-2xl mx-auto">
              <T k="policy.desc" en="Kameralog reviews gear the way a working Malaysian creator uses it. These are the rules we hold ourselves to — published so you can hold us to them too." />
            </p>
          </div>

          <div className="space-y-6 mb-16">
            {rules.map(r => (
              <div key={r.key} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-2"><T k={r.key} en={r.en} /></h2>
                <p className="text-sm text-zinc-200 leading-relaxed"><T k={r.d} en={r.den} /></p>
              </div>
            ))}
          </div>

          <div className="gradient-border rounded-3xl bg-zinc-900/70 p-8 md:p-10 mb-16">
            <h2 className="text-2xl font-black mb-3"><T k="policy.disclosure.t" en="Review units & sponsored content" /></h2>
            <p className="text-zinc-200 leading-relaxed">
              <T k="policy.disclosure.d" en="If a brand lends us a review unit, or pays for a clearly-labelled sponsored post, we say so in the article. No payment ever changes a score or verdict. Gear lent for review is returned, and a loan never means a good review — bad products are reviewed honestly regardless of who sent them." />
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2"><T k="policy.corrections.t" en="Corrections" /></h2>
            <p className="text-sm text-zinc-200 leading-relaxed">
              <T k="policy.corrections.d" en="Prices and specs change fast in Malaysia. If you spot an error, tell us at hello@kameralog.com and we&rsquo;ll fix and date the correction. Old prices are kept in reviews so you can see how the market moved." />
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
