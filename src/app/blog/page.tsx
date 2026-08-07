import { Metadata } from 'next';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Camera Reviews & Content Creation Guides Malaysia | Kameralog Blog',
  description: 'In-depth guides on starting content creation in Malaysia, gear comparisons, ROI analysis, and second-hand buying tips. Written for Malaysian creators.',
  openGraph: { title: 'Reviews & Guides — Kameralog Malaysia', description: 'Guides, gear comparisons, and inspiration for Malaysian content creators.' },
  alternates: { canonical: 'https://kameralog.com/blog' },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm text-green-400 font-semibold mb-4">
            ✍️ Kameralog Review Desk
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Reviews & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Guides</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Everything Tim & Ahmad need to know about starting content creation in Malaysia — from zero budget to consistent income.
          </p>
        </div>

        <BlogList />
      </div>
    </main>
  );
}
