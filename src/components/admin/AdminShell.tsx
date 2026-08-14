'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { POST_TYPES, postTypeIds } from '@/admin/types';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const typeLinks = postTypeIds().map(id => ({ id, label: POST_TYPES[id].label, href: `/admin/${id}` }));

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="bg-zinc-950 text-white sticky top-0 z-40 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2 font-black tracking-tight">
              <span className="grid place-items-center h-7 w-7 rounded-lg bg-gradient-to-br from-red-500 to-fuchsia-600 text-sm">K</span>
              <span className="text-sm">
                Kameralog <span className="text-red-400">CMS</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              {typeLinks.map(l => (
                <Link
                  key={l.id}
                  href={l.href}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    pathname.startsWith(l.href) ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {POST_TYPES[l.id].icon} {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" target="_blank" className="px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors hidden sm:inline-flex">
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
