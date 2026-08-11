import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import HashtagGlossary from '@/components/HashtagGlossary';
import { T } from '@/components/T';
import { langAlternates } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Gear Hashtag Glossary — Curated Settings & Pay-off Library | Kameralog MY',
    description:
      'Search and curate Malaysian gear hashtags like #DJIOSMO, #IPHONE17PRO and #NIKOND3100. Every hashtag has an on-site settings recipe, gear review, and "how many gigs to pay it off" math — no out-clicks to Instagram.',
    openGraph: {
      title: 'Hashtag Glossary — Kameralog Malaysia',
      description: 'Instagram-style hashtag search kept on-site: settings recipes, gear reviews, and pay-off math for every Malaysian gear hashtag.',
    },
    ...langAlternates(lang, '/hashtags'),
  };
}

export default function HashtagsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 text-sm text-cyan-400 font-semibold mb-4">
              🏷️ <T k="hashtags.hero.badge" en="Hashtag Glossary — curated on-site, no out-clicks" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              <T k="hashtags.hero.head" en="Search Gear Hashtags," /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-fuchsia-400"><T k="hashtags.hero.accent" en="Keep Content Here" /></span>
            </h1>
            <p className="text-zinc-200 max-w-2xl mx-auto text-lg">
              <T k="hashtags.hero.desc" en="Type a hashtag like #DJIOSMO or #IPHONE17PRO and get a curated library of settings recipes, gear reviews, and the exact part-time gigs that pay the gear off. All on your site — no Instagram hopping." />
            </p>
          </div>

          <HashtagGlossary />

          <div className="mt-16">
            <AdSlot />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
