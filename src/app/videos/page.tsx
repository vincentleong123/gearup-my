import { Metadata } from 'next';
import VideoWall from '@/components/VideoWall';
import InstagramWall from '@/components/InstagramWall';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Video Tutorials for Malaysian Content Creators | Kameralog TV',
  description: 'Curated short videos on mobile photography, portraits, drones, gimbal work, mirrorless cameras, editing and AI tools — plus a live Instagram cameralogue wall. Hand-picked for Malaysian creators starting from zero.',
  openGraph: { title: 'Kameralog TV — Learn To Create', description: 'Curated camera & content creation video tutorials for Malaysian creators.' },
  alternates: { canonical: 'https://kameralog.com/videos' },
};

export default function VideosPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 text-sm text-pink-400 font-semibold mb-4">
            🎬 Kameralog TV — The Video Wall
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Learn To <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-fuchsia-400">Create</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Short, curated tutorials — mobile photography, portraits, drones, gimbals, mirrorless cameras, editing and AI tools.
            Skills first. Gear second. Every video hand-picked for the Malaysian creator starting from RM0.
          </p>
        </div>

        <VideoWall />

        <div className="mt-16">
          <AdSlot />
        </div>
      </div>

      {/* Instagram cameralogue wall */}
      <section id="instagram" className="py-16 md:py-20 border-t border-zinc-800/50 bg-zinc-900/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 border border-fuchsia-500/30 rounded-full px-4 py-1.5 text-sm text-pink-300 font-semibold mb-4">
              📸 Live From Instagram — The Cameralogue Wall
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Real Gears. <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-red-400">Real Shoots.</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Hand-saved camera reels and gear drops we actually rate — unboxings, lens tests, lighting setups and
              behind-the-scenes. Tap any card for the real Instagram post.
            </p>
          </div>

          <InstagramWall />
        </div>
      </section>

      <Footer />
    </main>
  );
}
