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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Pick a post type — each vertical has its own categories, fields and ROI model.
          </p>
        </div>
        <RebuildPanel />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {postTypeIds().map(id => {
          const type = POST_TYPES[id];
          const posts = counts[id] || [];
          const published = posts.filter(p => p.status === 'published').length;
          const drafts = posts.filter(p => p.status === 'draft').length;
          const scheduled = posts.filter(p => p.status === 'scheduled').length;
          return (
            <div key={id} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center h-11 w-11 rounded-xl bg-zinc-100 text-2xl">{type.icon}</span>
                  <div>
                    <h2 className="font-black">{type.label}</h2>
                    <p className="text-xs text-zinc-500">
                      {posts.length} posts · {published} live · {drafts} draft · {scheduled} scheduled
                    </p>
                  </div>
                </div>
                <Link
                  href={`/admin/${id}/new`}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors"
                >
                  + New {type.singular}
                </Link>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">{type.description}</p>
              <Link href={`/admin/${id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-500">
                Manage {type.label} →
              </Link>
              {posts.slice(0, 3).length > 0 && (
                <div className="mt-4 border-t border-zinc-100 pt-3 space-y-2">
                  {posts.slice(0, 3).map(p => (
                    <Link key={p.slug} href={`/admin/${id}/${p.slug}`} className="block text-sm text-zinc-700 hover:text-red-600 truncate">
                      {p.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {loading && <p className="text-sm text-zinc-400">Loading…</p>}
    </div>
  );
}
