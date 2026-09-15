'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { POST_TYPES, postTypeIds } from '@/admin/types';

const nav = [
  { label: 'Dashboard', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1' },
  { label: 'Images', href: '/admin/images', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Settings', href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'SEO', href: '/admin/seo', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
];

const typeNav = postTypeIds().map(id => ({
  label: POST_TYPES[id].label,
  singular: POST_TYPES[id].singular,
  icon: POST_TYPES[id].icon,
  href: `/admin/${id}`,
}));

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.replace('/admin/login');
    router.refresh();
  }

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-zinc-950 text-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className={`flex items-center h-16 border-b border-white/10 ${collapsed ? 'justify-center px-2' : 'px-5'}`}>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm truncate flex items-center gap-2">
              <span className="grid place-items-center h-6 w-6 rounded-md bg-gradient-to-br from-red-500 to-fuchsia-600 text-xs font-black">K</span>
              Kameralog
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider">CMS</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="text-white/50 hover:text-white ml-2 shrink-0"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
          </svg>
        </button>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        <div className={`${collapsed ? 'px-1' : 'px-3'} mb-1`}>
          {!collapsed && <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold px-2 mb-2">Content</div>}
          {typeNav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mb-0.5 ${
                isActive(item.href)
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              } ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          ))}
        </div>

        <div className={`border-t border-white/5 ${collapsed ? 'px-1 mt-3 pt-3' : 'px-3 mt-3 pt-3'}`}>
          {!collapsed && <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold px-2 mb-2">Tools</div>}
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mb-0.5 ${
                isActive(item.href)
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              } ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t border-white/10 p-3 space-y-2">
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors ${collapsed ? 'justify-center px-2' : ''}`}
          title={collapsed ? 'View site' : undefined}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {!collapsed && <span>View site</span>}
        </Link>
        <button
          onClick={logout}
          disabled={loggingOut}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors ${collapsed ? 'justify-center px-2' : ''}`}
          title={collapsed ? 'Log out' : undefined}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span>{loggingOut ? 'Logging out...' : 'Log out'}</span>}
        </button>
      </div>
    </aside>
  );
}
