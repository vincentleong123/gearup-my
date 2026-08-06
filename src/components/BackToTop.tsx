'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-xl shadow-pink-600/30 hover:shadow-pink-500/50 hover:-translate-y-0.5 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
      }`}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
