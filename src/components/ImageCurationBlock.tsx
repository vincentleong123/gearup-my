import type { ImageCurationBlock as ImageCurationItem } from '@/data/content';

function resolveSrc(item: ImageCurationItem | undefined): string {
  if (!item) return '';
  const f = item.filename || '';
  if (f.startsWith('/') || f.startsWith('http')) return f;
  const s = item.sourceUrl || '';
  if (s.startsWith('/') || s.startsWith('http')) return s;
  return '';
}

export default function ImageCurationBlock({
  item,
  fallbackLabel = 'Image curation',
}: {
  item?: ImageCurationItem;
  fallbackLabel?: string;
}) {
  const active = !item || item.active !== false;
  const src = active ? resolveSrc(item) : '';
  const ratio = item?.aspectRatio || '16/9';
  const ratioClass =
    ratio === '4/3' ? 'aspect-[4/3]' : ratio === '3/2' ? 'aspect-[3/2]' : ratio === '1/1' ? 'aspect-square' : ratio === '9/16' ? 'aspect-[9/16]' : 'aspect-[16/9]';

  if (!active || !item) {
    return (
      <figure className="my-10">
        <div className={`w-full ${ratioClass} rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900/40 flex items-center justify-center`}>
          <div className="text-center px-6 py-10">
            <div className="text-2xl mb-2">🖼️</div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{fallbackLabel}</p>
            {item?.caption && <p className="text-sm text-zinc-300 font-semibold mt-1">{item.caption}</p>}
          </div>
        </div>
        {(item?.caption || item?.credit) && (
          <figcaption className="text-sm text-zinc-500 mt-3 leading-relaxed">
            <span className="text-zinc-700">—</span> {item?.caption}
            {item?.credit ? ` (${item.credit})` : ''}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-10">
      <div className={`w-full ${ratioClass} rounded-2xl overflow-hidden bg-zinc-900 ring-1 ring-zinc-800`}>
        <img
          src={src}
          alt={item.alt || item.caption || 'Editorial image'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {(item.caption || item.credit) && (
        <figcaption className="text-sm text-zinc-500 mt-3 leading-relaxed">
          <span className="text-zinc-700">—</span> {item.caption}
          {item.credit ? ` (${item.credit})` : ''}
        </figcaption>
      )}
    </figure>
  );
}


