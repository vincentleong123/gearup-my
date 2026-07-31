'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { gearList } from '@/data/gear';
import { gearImg } from '@/data/images';
import { formatPrice, roiColor, roiBarColor, getLevelLabel } from '@/lib/utils';

function CompareInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedSlugs = (searchParams.get('slugs') || '').split(',').filter(Boolean);
  const selected = selectedSlugs.map(s => gearList.find(g => g.slug === s)).filter(Boolean);

  const toggleGear = (slug: string) => {
    const current = new Set(selectedSlugs);
    if (current.has(slug)) current.delete(slug);
    else if (current.size < 3) current.add(slug);
    const slugs = [...current].join(',');
    router.push(slugs ? `/compare?slugs=${slugs}` : '/compare');
  };

  const available = gearList.filter(g => !selectedSlugs.includes(g.slug) && selectedSlugs.length < 3);

  return (
    <div>
      {selected.length > 0 && (
        <div className="mb-10">
          <div className={`grid ${selected.length === 1 ? 'md:grid-cols-1' : selected.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
            {selected.map((gear) => gear && (
              <div key={gear.slug} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="h-36 relative overflow-hidden bg-zinc-800 border-b border-zinc-800">
                  <img src={gearImg(gear.slug)} alt={gear.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="font-bold text-lg text-white drop-shadow-lg">{gear.name}</h3>
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-1 ${gear.level === 'beginner' ? 'bg-green-500/20 text-green-400' : gear.level === 'mid' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{getLevelLabel(gear.level)}</span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-zinc-500 block text-xs">Price Used</span><span className="text-green-400 font-bold text-lg">{formatPrice(gear.priceUsed)}</span></div>
                    <div><span className="text-zinc-500 block text-xs">New</span><span className="text-zinc-300 font-bold">{formatPrice(gear.priceNew)}</span></div>
                    <div><span className="text-zinc-500 block text-xs">Type</span><span className="text-zinc-300">{gear.type}</span></div>
                    <div><span className="text-zinc-500 block text-xs">Rating</span><span className="text-zinc-300">{gear.rating}</span></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-zinc-500">ROI</span><span className={`font-bold ${roiColor(gear.roiScore)}`}>{gear.roiScore}/100</span></div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden"><div className={`h-full rounded-full ${roiBarColor(gear.roiScore)}`} style={{ width: gear.roiScore + '%' }} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="col-span-2"><span className="text-zinc-500 block text-xs mb-1">Pros</span>
                      <ul className="space-y-1">
                        {gear.pros.slice(0, 3).map(p => <li key={p} className="text-xs text-green-400">{p}</li>)}
                      </ul>
                    </div>
                    <div className="col-span-2"><span className="text-zinc-500 block text-xs mb-1">Cons</span>
                      <ul className="space-y-1">
                        {gear.cons.slice(0, 3).map(c => <li key={c} className="text-xs text-red-400">{c}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500 space-y-0.5">
                    <p><span className="text-zinc-400">Sensor:</span> {gear.sensor}</p>
                    <p><span className="text-zinc-400">Video:</span> {gear.video}</p>
                    <p><span className="text-zinc-400">Weight:</span> {gear.weight}</p>
                  </div>
                  <Link href={'/gear/' + gear.slug} className="block text-center text-sm text-red-400 hover:text-red-300 font-semibold pt-2 border-t border-zinc-800">Full Review &rarr;</Link>
                </div>
                <button onClick={() => toggleGear(gear.slug)} className="w-full p-3 text-sm text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors border-t border-zinc-800 font-medium">Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selected.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">&#x2694;&#xFE0F;</div>
          <h2 className="text-2xl font-bold mb-2">Select gear to compare</h2>
          <p className="text-zinc-400 mb-6">Pick 2 or 3 gear items below and see them side by side</p>
        </div>
      )}

      <div className="border-t border-zinc-800 pt-10">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">
          {selected.length < 3 ? 'Select ' + (3 - selected.length) + ' more item' + (3 - selected.length === 1 ? '' : 's') + ' to compare' : 'Selected 3 items'}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {available.map(g => (
            <button key={g.slug} onClick={() => toggleGear(g.slug)} className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 hover:border-red-500/30 hover:bg-zinc-900 transition-all text-left">
              <img src={gearImg(g.slug)} alt={g.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" loading="lazy" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{g.name}</div>
                <div className="text-xs text-zinc-500">{g.type} &middot; <span className="text-green-400">{formatPrice(g.priceUsed)}</span></div>
              </div>
              <span className={'text-xs font-bold px-2 py-1 rounded-full ' + roiColor(g.roiScore)}>{g.roiScore}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CompareClient() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-zinc-500">Loading...</div>}>
      <CompareInner />
    </Suspense>
  );
}
