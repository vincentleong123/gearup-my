import { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Content Creation Guides & Gear Comparisons Malaysia | GearUp Blog',
  description: 'In-depth guides on starting content creation in Malaysia, gear comparisons, ROI analysis, and second-hand buying tips. Written for Malaysian creators.',
  openGraph: { title: 'Blog & Guides — GearUp Malaysia', description: 'Guides, gear comparisons, and inspiration for Malaysian content creators.' },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Guides & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Articles</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Everything Tim & Ahmad need to know about starting content creation in Malaysia — from zero budget to consistent income.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((a, i) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group block bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-6xl relative">
                {a.category === 'guide' ? '📖' : a.category === 'comparison' ? '⚔️' : a.category === 'inspiration' ? '💡' : '🔧'}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 uppercase">{a.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
                  <span>{a.date}</span>
                  <span>·</span>
                  <span>{a.readTime} min read</span>
                </div>
                <h2 className="text-xl font-bold group-hover:text-green-400 transition-colors mb-3">{a.title}</h2>
                <p className="text-zinc-400 leading-relaxed">{a.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {a.tags.map(t => (
                    <span key={t} className="text-xs text-zinc-500 bg-zinc-800/50 px-2.5 py-1 rounded-full">#{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
