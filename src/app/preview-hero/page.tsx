const candidates = [
  'v2_look_viewer_hero.jpg',
  'v2_shoulder_hero.jpg',
  'v2_viewfinder_hero.jpg',
  'v2_close_hero.jpg',
  'hero_woman_camera_hero.jpg',
  'hero_woman_camera_2_hero.jpg',
  'hero_woman_16x9_hero.jpg',
  'hero_woman_wide2_hero.jpg',
];

export default function PreviewHeroPage() {
  return (
    <main className="min-h-screen bg-zinc-950 p-6">
      <h1 className="text-2xl font-black text-white mb-2">Hero candidates</h1>
      <p className="text-zinc-400 mb-6 text-sm">
        Pick a favorite, then tell the assistant which one. Files are in <code className="text-zinc-300">public/</code>.
      </p>
      <div className="flex flex-col gap-8">
        {candidates.map((c) => (
          <div key={c} className="border border-zinc-800 rounded-xl overflow-hidden">
            <img src={`/${c}`} alt={c} className="w-full" />
            <p className="p-2 text-sm font-mono text-zinc-300 bg-zinc-900">{c}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
