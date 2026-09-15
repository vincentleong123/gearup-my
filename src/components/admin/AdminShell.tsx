'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/images': 'Image Curation',
    '/admin/settings': 'Site Settings',
    '/admin/seo': 'SEO Manager',
  };
  let title = titles[pathname] || 'Admin Panel';
  if (pathname.includes('/new')) title = 'New Post';
  else if (/^\/admin\/[^/]+\/[^/]+$/.test(pathname)) title = 'Edit Post';

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-zinc-900">
      <AdminSidebar />
      <div className="ml-60 min-h-screen">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 sticky top-0 z-40">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg font-semibold text-gray-900 truncate">{title}</h1>
            <div className="flex items-center gap-1">
              <Link
                href="/admin/images"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  pathname === '/admin/images' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                Images
              </Link>
              <Link
                href="/"
                target="_blank"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                View site ↗
              </Link>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}