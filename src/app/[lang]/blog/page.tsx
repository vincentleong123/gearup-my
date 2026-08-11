import { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import { T } from '@/components/T';
import { langAlternates } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Camera Reviews & Content Creation Guides Malaysia | Kameralog Blog',
    description: 'In-depth guides on starting content creation in Malaysia, gear comparisons, ROI analysis, and second-hand buying tips. Written for Malaysian creators.',
    openGraph: { title: 'Reviews & Guides — Kameralog Malaysia', description: 'Guides, gear comparisons, and inspiration for Malaysian content creators.' },
    ...langAlternates(lang, '/blog'),
  };
}

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm text-green-400 font-semibold mb-4">
            ✍️ <T k="blog.hero.badge" en="Kameralog Review Desk" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <T k="blog.hero.head" en="Reviews &" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500"><T k="blog.hero.accent" en="Guides" /></span>
          </h1>
          <p className="text-zinc-200 max-w-xl mx-auto text-lg">
            <T k="blog.hero.desc" en="Everything Tim & Ahmad need to know about starting content creation in Malaysia — from zero budget to consistent income." />
          </p>
        </div>

        <BlogList />
      </div>
    </main>
  );
}
