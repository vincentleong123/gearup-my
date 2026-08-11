import { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CurationWall, { CurationTopic } from '@/components/CurationWall';
import { allGigTopics } from '@/lib/curation';
import { imgUrl, scenarioRefs } from '@/data/images';
import { T } from '@/components/T';
import { langAlternates, withLang } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Inspiration Wall — Live Camera Gigs Content Curated from Google & Social | Kameralog MY',
    description:
      'An auto-curating inspiration wall for Malaysian camera gigs. Live search links to Google Images, Instagram hashtags, TikTok and YouTube — plus shuffled imagery for every gig niche.',
    openGraph: {
      title: 'Inspiration Wall — Kameralog Malaysia',
      description: 'Live-curated inspiration for graduation shoots, weddings, galas, portraits and more.',
    },
    ...langAlternates(lang, '/curate'),
  };
}

function scenarioTopic(id: string, label: string, emoji: string, hashtags: string[], searchTerms: string[]): CurationTopic {
  return {
    id,
    label,
    emoji,
    images: (scenarioRefs[id] || []).map(p => imgUrl(p)),
    hashtags,
    searchTerms,
  };
}

export default async function CuratePage({ params }: Props) {
  const { lang } = await params;
  const topics: CurationTopic[] = [
    ...allGigTopics(),
    scenarioTopic('iphone-window-light', 'Phone + Window Light', '📱', ['phonevideography', 'naturallight'], ['iPhone content creation setup', 'natural window light video']),
    scenarioTopic('desk-setup-ring-light', 'Desk & Ring Light Setups', '💡', ['contentcreatorsetup', 'ringlight'], ['desk setup content creator', 'ring light setup Malaysia']),
    scenarioTopic('drone-aerial-malaysia', 'Drone Aerial Malaysia', '🚁', ['dronemalaysia', 'aerialvideography'], ['drone aerial Malaysia', 'aerial videography']),
    scenarioTopic('beauty-review-setup', 'Beauty & Product Review Setups', '💄', ['beautytiktok', 'productreview'], ['beauty review setup', 'product review video setup']),
  ];

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 font-semibold mb-5">
              🔴 <T k="curate.hero.badge" en="LIVE · auto-curated from the web" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              <T k="curate.hero.head" en="Inspiration" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500"><T k="curate.hero.accent" en="Wall" /></span>
            </h1>
            <p className="text-zinc-200 text-lg leading-relaxed">
              <T k="curate.hero.desc" en="Never run out of ideas. Pick a gig niche and the wall curates fresh visual inspiration while live-linking you to Google Images, Instagram hashtags, TikTok and YouTube — so you can study what real clients pay for and replicate it locally." />
            </p>
          </div>

          <CurationWall topics={topics} title="Curate my next gig" />

          {/* How to use */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <div className="text-3xl mb-3">1️⃣</div>
              <h3 className="font-bold mb-2"><T k="curate.step1head" en="Pick a niche" /></h3>
              <p className="text-zinc-200 text-sm leading-relaxed">
                <T k="curate.step1desc" en="Tap a topic chip — graduation, wedding, gala, portrait, video, food, property… Each has its own curated visuals." />
              </p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <div className="text-3xl mb-3">2️⃣</div>
              <h3 className="font-bold mb-2"><T k="curate.step2head" en="Follow the live search" /></h3>
              <p className="text-zinc-200 text-sm leading-relaxed">
                <T k="curate.step2desc" en="Switch platform — Google, Instagram, TikTok, YouTube — and tap any tile. It opens the live search with real posts and real prices." />
              </p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <div className="text-3xl mb-3">3️⃣</div>
              <h3 className="font-bold mb-2"><T k="curate.step3head" en="Replicate locally" /></h3>
              <p className="text-zinc-200 text-sm leading-relaxed">
                <T k="curate.step3desc" en="Copy the shot list, the angle, the hook. Shoot it in your town, tag it, and pitch it to local clients. That's the whole system." />
              </p>
            </div>
          </div>

          {/* Hashtag bank */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-3">#️⃣ <T k="curate.bankHead" en="The hashtag bank" /></h2>
            <p className="text-zinc-500 text-sm mb-5"><T k="curate.bankDesc" en="One-click mining. Open any tag on Instagram or TikTok and study the top posts." /></p>
            <div className="flex flex-wrap gap-2">
              {topics.flatMap(t => t.hashtags.slice(0, 2)).map((tag, i) => (
                <a
                  key={i}
                  href={`https://www.instagram.com/explore/tags/${encodeURIComponent(tag.replace('#', ''))}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-400 bg-cyan-500/5 border border-cyan-500/20 px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-red-500/10 to-pink-500/5 border border-red-500/20 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-3"><T k="curate.ctaHead" en="Inspiration is only half the equation" /></h2>
            <p className="text-zinc-200 max-w-xl mx-auto mb-6">
              <T k="curate.ctaDesc" en="See the gear each gig needs and how fast it pays for itself. Start with the Gear Match quiz or browse the gig hub." />
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={withLang(lang, '/gigs')} className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-red-500/25 transition-all">
                💰 <T k="curate.exploreGigs" en="Explore the Gigs Hub" />
              </Link>
              <Link href={withLang(lang, '/quiz')} className="inline-flex items-center gap-2 px-7 py-3.5 bg-zinc-800/50 text-white font-bold rounded-xl border border-zinc-700/50 hover:bg-zinc-800 transition-all">
                🎯 <T k="curate.quiz" en="Gear Match Quiz" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
