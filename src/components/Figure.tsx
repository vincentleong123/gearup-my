export interface Figure {
  src: string;
  alt: string;
  caption?: string;
  tags?: string[];
  href?: string;
}

export default function Figure({ figure, className = '' }: { figure: Figure; className?: string }) {
  return (
    <figure className={`my-10 ${className}`}>
      <div className="group relative rounded-2xl overflow-hidden bg-zinc-900 ring-1 ring-zinc-800">
        <img
          src={figure.src}
          alt={figure.alt}
          className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />
        {figure.tags && figure.tags.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 justify-end">
            {figure.tags.slice(0, 2).map(t => (
              <a
                key={t}
                href={`https://www.instagram.com/explore/tags/${encodeURIComponent(t.replace('#', '').trim())}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-zinc-950/70 backdrop-blur-sm text-cyan-300 hover:bg-cyan-500/20 border border-cyan-400/20 transition-all"
              >
                {t.startsWith('#') ? t : `#${t}`}
              </a>
            ))}
          </div>
        )}
      </div>
      {figure.caption && (
        <figcaption className="text-sm text-zinc-500 mt-3 flex items-start gap-2 leading-relaxed">
          <span className="text-zinc-700">—</span>
          <span>{figure.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
