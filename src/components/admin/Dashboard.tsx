'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { POST_TYPES, postTypeIds } from '@/admin/types';
import RebuildPanel from './RebuildPanel';

interface PostRow {
  slug: string;
  title: string;
  status: string;
  category: string;
  date: string;
  updatedAt?: string;
}

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, PostRow[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      postTypeIds().map(async id => {
        const res = await fetch(`/api/admin/posts?type=${id}`);
        if (!res.ok) return [id, [] as PostRow[]] as const;
        const data = await res.json();
        return [id, (data.posts || []) as PostRow[]] as const;
      }),
    ).then(rows => {
      if (!cancelled) {
        const next: Record<string, PostRow[]> = {};
        for (const [id, posts] of rows) next[id] = posts;
        setCounts(next);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const allPosts = Object.values(counts).flat();
  const published = allPosts.filter(p => p.status === 'published').length;
  const drafts = allPosts.filter(p => p.status === 'draft').length;
  const scheduled = allPosts.filter(p => p.status === 'scheduled').length;

  const stats = [
    {
      label: 'Total Posts',
      value: allPosts.length.toString(),
      sub: 'across all verticals',
      icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Published',
      value: published.toString(),
      sub: 'live on the site',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Drafts',
      value: drafts.toString(),
      sub: 'in progress',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Scheduled',
      value: scheduled.toString(),
      sub: 'waiting to publish',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  const quickActions = [
    { label: 'New Article', href: '/admin/article/new', icon: 'M12 4v16m8-8H4' },
    { label: 'New Security Post', href: '/admin/securitySystem/new', icon: 'M12 4v16m8-8H4' },
    { label: 'Manage Images', href: '/admin/images', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Site Settings', href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { label: 'SEO Manager', href: '/admin/seo', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { label: 'Rebuild Site', href: '#', icon: 'M4 4v5h5M20 20v-5h-5M5.5 10.5a8 8 0 0113.5-3m0 9a8 8 0 01-13.5 3' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Overview of your content across all verticals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(a =>
              a.href === '#' ? (
                <span key={a.label} className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon} />
                  </svg>
                  {a.label}
                  <span className="ml-auto text-[10px] uppercase text-gray-300">In header</span>
                </span>
              ) : (
                <Link key={a.label} href={a.href} className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-zinc-900 hover:bg-zinc-900/5 transition-colors text-sm font-medium text-gray-700">
                  <svg className="w-4 h-4 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon} />
                  </svg>
                  {a.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Content Overview</h3>
            <RebuildPanel />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Published</span>
              <span className="font-semibold text-green-600">{published}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Drafts</span>
              <span className="font-semibold text-amber-600">{drafts}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Scheduled</span>
              <span className="font-semibold text-purple-600">{scheduled}</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-sm text-gray-600">Publish rate</span>
              <span className="font-semibold text-gray-900">
                {allPosts.length > 0 ? Math.round((published / allPosts.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {postTypeIds().map(id => {
          const type = POST_TYPES[id];
          const posts = counts[id] || [];
          const typePublished = posts.filter(p => p.status === 'published').length;
          const typeDrafts = posts.filter(p => p.status === 'draft').length;
          const typeScheduled = posts.filter(p => p.status === 'scheduled').length;
          return (
            <div key={id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center h-11 w-11 rounded-xl bg-zinc-100 text-2xl">{type.icon}</span>
                  <div>
                    <h2 className="font-bold text-gray-900">{type.label}</h2>
                    <p className="text-xs text-gray-500">
                      {posts.length} posts · {typePublished} live · {typeDrafts} draft · {typeScheduled} scheduled
                    </p>
                  </div>
                </div>
                <Link
                  href={`/admin/${id}/new`}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-700 transition-colors"
                >
                  + New {type.singular}
                </Link>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{type.description}</p>
              <div className="flex items-center justify-between">
                <Link href={`/admin/${id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 hover:underline">
                  Manage {type.label} →
                </Link>
              </div>
              {posts.slice(0, 3).length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-3 space-y-2">
                  {posts.slice(0, 3).map(p => (
                    <Link key={p.slug} href={`/admin/${id}/${p.slug}`} className="block text-sm text-gray-500 hover:text-zinc-900 truncate transition-colors">
                      {p.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {loading && <p className="mt-6 text-sm text-gray-400">Loading...</p>}
    </div>
  );
}