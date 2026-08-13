'use client';

import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'top-picks', label: 'Picks', icon: '🏆' },
  { id: 'gigs', label: 'Gigs', icon: '💰' },
  { id: 'gear', label: 'Gear', icon: '📷' },
  { id: 'creators', label: 'Stories', icon: '🎭' },
  { id: 'calculator', label: 'ROI', icon: '🧮' },
  { id: 'blog', label: 'Blog', icon: '✍️' },
  { id: 'videos', label: 'Videos', icon: '🎬' },
  { id: 'instagram', label: 'Instagram', icon: '📸' },
  { id: 'tools', label: 'Tools', icon: '🧰' },
];

export default function ScrollGuide() {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [stops, setStops] = useState<typeof SECTIONS>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const present = SECTIONS.filter((s) => document.getElementById(s.id));
    setStops(present);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

        h.style.setProperty('--sg-x', `${10 + p * 55}%`);
        h.style.setProperty('--sg-y', `${5 + p * 65}%`);
        h.style.setProperty('--sg-o', `${0.05 + 0.07 * p}`);
        h.style.setProperty('--sg-x2', `${15 + p * 40}%`);
        h.style.setProperty('--sg-y2', `${15 + p * 50}%`);
        h.style.setProperty('--sg-o2', `${0.04 + 0.06 * p}`);

        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    present.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed top-0 left-0 h-[3px] w-full origin-left z-[60] bg-gradient-to-r from-red-500 via-pink-500 to-fuchsia-500 shadow-[0_0_12px_rgba(236,72,153,0.55)]"
        style={{ transform: 'scaleX(0)' }}
      />
      <div aria-hidden="true" className="scroll-glow" />

      {stops.length >= 3 && (
        <nav
          aria-label="Page sections"
          className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2.5"
        >
          <div className="relative h-56 w-px bg-white/10 overflow-hidden rounded-full">
            <div
              ref={fillRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-pink-500 to-fuchsia-500"
              style={{ height: '0%' }}
            />
          </div>
          {stops.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              aria-label={`Go to ${s.label}`}
              aria-current={active === s.id ? 'true' : undefined}
              className={`grid place-items-center h-7 w-7 rounded-full text-xs transition-all duration-300 ${
                active === s.id
                  ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white scale-110 shadow-[0_0_12px_rgba(217,70,239,0.6)]'
                  : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/15 border border-white/10'
              }`}
            >
              <span>{s.icon}</span>
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
