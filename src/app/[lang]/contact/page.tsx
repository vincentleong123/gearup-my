import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { T } from '@/components/T';
import { langAlternates } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Contact Kameralog — Reviews, Brands & Partnerships | Kameralog MY',
    description:
      'Get in touch with Kameralog: review requests, brand partnerships, advertising, corrections, or just a gear question. We reply to everything.',
    ...langAlternates(lang, '/contact'),
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;

  interface Channel {
    emoji: string;
    key: string;
    en: string;
    d: string;
    den: string;
    mail?: string;
    href?: string;
    cta?: string;
  }

  const channels: Channel[] = [
    {
      emoji: '📬',
      key: 'contact.ads.t',
      en: 'Advertising & partnerships',
      d: 'contact.ads.d',
      den: 'Ads, sponsorships, and media kit requests. Tell us your product and timeline.',
      mail: 'ads@kameralog.com',
    },
    {
      emoji: '🤝',
      key: 'contact.brands.t',
      en: 'Brand review requests',
      d: 'contact.brands.d',
      den: 'Send a product for review, or pitch a collaboration. We&rsquo;ll reply with our review policy.',
      mail: 'hello@kameralog.com',
    },
    {
      emoji: '✍️',
      key: 'contact.feedback.t',
      en: 'Corrections & feedback',
      d: 'contact.feedback.d',
      den: 'Spotted a wrong price or fact? Tell us and we&rsquo;ll fix it.',
      mail: 'hello@kameralog.com',
    },
    {
      emoji: '🎒',
      key: 'contact.gig.t',
      en: 'Reader gear questions',
      d: 'contact.gig.d',
      den: 'Which gear should I buy? Your questions become articles and updated reviews.',
      mail: 'hello@kameralog.com',
    },
    {
      emoji: '📸',
      key: 'contact.ig.t',
      en: 'Founder on Instagram',
      d: 'contact.ig.d',
      den: 'Gear shots, behind-the-scenes, and new-review alerts from the founder.',
      href: 'https://instagram.com/cameralogue',
      cta: '@cameralogue',
    },
    {
      emoji: '✉️',
      key: 'contact.founder.t',
      en: 'Founder direct line',
      d: 'contact.founder.d',
      den: 'Prefer the founder&rsquo;s personal inbox? cameralogue@gmail.com works too.',
      mail: 'cameralogue@gmail.com',
    },
  ];

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 text-sm text-pink-400 font-semibold mb-5">
              <T k="contact.badge" en="📬 Contact" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              <T k="contact.head" en="Talk to" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-fuchsia-500"><T k="contact.headAccent" en="Kameralog" /></span>
            </h1>
            <p className="text-zinc-200 text-lg leading-relaxed max-w-xl mx-auto">
              <T k="contact.desc" en="Brands, readers, and future partners — pick the right inbox below. We reply to everything, usually within two working days." />
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {channels.map(c => (
              <div key={c.key} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 hover:border-pink-500/30 transition-all duration-300">
                <div className="text-3xl mb-3">{c.emoji}</div>
                <h2 className="text-lg font-bold mb-1"><T k={c.key} en={c.en} /></h2>
                <p className="text-sm text-zinc-200 mb-4"><T k={c.d} en={c.den} /></p>
                <a
                  href={c.href ?? `mailto:${c.mail}`}
                  target={c.href ? '_blank' : undefined}
                  rel={c.href ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors"
                >
                  {c.href ? <T k="contact.followBtn" en="Follow on Instagram" /> : <T k="contact.emailBtn" en="Email us" />} → {c.cta ?? c.mail}
                </a>
              </div>
            ))}
          </div>

          <div className="gradient-border rounded-3xl bg-zinc-900/70 p-8 md:p-10">
            <h2 className="text-2xl font-black mb-3"><T k="contact.response.t" en="What happens next?" /></h2>
            <p className="text-zinc-200 leading-relaxed">
              <T k="contact.response.d" en="For brand pitches and review requests, tell us the product, your timeline, and whether a review unit is available. We&rsquo;ll reply with our honest review policy and what we can commit to. Reader questions get answered in articles and updated reviews." />
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
