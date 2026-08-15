'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { POST_TYPES, postTypeIds } from '@/admin/types';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const typeLinks = postTypeIds().map(id => ({
    id,
    label: POST_TYPES[id].label,
    icon: POST_TYPES[id].icon,
    href: `/admin/${id}`,
  }));

  const active = typeLinks.find(l => pathname.startsWith(l.href));

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="bg-zinc-950 text-white sticky top-0 z-40 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link href="/admin" className="flex items-center gap-2 font-black tracking-tight shrink-0">
              <span className="grid place-items-center h-7 w-7 rounded-lg bg-gradient-to-br from-red-500 to-fuchsia-600 text-sm">K</span>
              <span className="hidden sm:inline text-sm">
                Kameralog <span className="text-red-400">CMS</span>
              </span>
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
                className={`flex items-center gap-1.5 pl-2.5 pr-1.5 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
                  open || active ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <span>{active ? active.icon : '📂'}</span>
                <span className="truncate max-w-[7rem] sm:max-w-[10rem]">{active ? active.label : 'Post Types'}</span>
                <svg
                  className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl py-2 z-50 animate-fade-in">
                  <p className="px-4 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-zinc-500">Post types</p>
                  {typeLinks.map(l => (
                    <Link
                      key={l.id}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold transition-colors ${
                        pathname.startsWith(l.href) ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                      }`}
                    >
                      <span>{l.icon}</span>
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm shrink-0">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors hidden sm:inline-flex"
            >
              View site ↗
            </Link>
            <button onClick={logout} className="px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-bold transition-colors">
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
