import { gearHashtagsFor } from '@/data/gearHashtags';

interface Props {
  gearSlug: string;
  gearName: string;
}

function buildUrl(tag: string, gearName: string, platform: 'instagram' | 'tiktok' | 'youtube' | 'google'): string {
  const clean = tag.replace('#', '').trim();
  switch (platform) {
    case 'instagram': return `https://www.instagram.com/explore/tags/${encodeURIComponent(clean)}/`;
    case 'tiktok': return `https://www.tiktok.com/tag/${encodeURIComponent(clean)}`;
    case 'youtube': return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${gearName} ${clean}`)}`;
    case 'google': return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${gearName} ${clean}`)}`;
  }
}

export default function HashtagBank({ gearSlug, gearName }: Props) {
  const tags = gearHashtagsFor(gearSlug);
  if (tags.length === 0) return null;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
        <h2 className="text-xl font-black">🏷️ Search #{gearName.replace(/\s+/g, '')} on Social</h2>
      </div>
      <p className="text-sm text-zinc-400 mb-4">
        One-tap live hashtag searches — the exact tags creators tag this model with on Instagram and TikTok.
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <div key={tag} className="inline-flex flex-col gap-1">
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-cyan-300">
              #{tag}
            </span>
            <div className="flex gap-1">
              {(['instagram', 'tiktok', 'youtube', 'google'] as const).map(p => (
                <a
                  key={p}
                  href={buildUrl(tag, gearName, p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors ${
                    p === 'instagram' ? 'border-pink-500/30 text-pink-400 hover:bg-pink-500/10' :
                    p === 'tiktok' ? 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10' :
                    p === 'youtube' ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' :
                    'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'
                  }`}
                >
                  {p === 'instagram' ? 'IG' : p === 'tiktok' ? 'TT' : p === 'youtube' ? 'YT' : 'GO'} ↗
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
