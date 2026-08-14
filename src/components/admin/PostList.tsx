'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { POST_TYPES } from '@/admin/types';

interface PostRow {
  slug: string;
  title: string;
  status: string;
  category: string;
  date: string;
  updatedAt?: string;
  author?: string;
  lang?: string;
}

const statusColor: Record<string, string> = {
  published: 'bg-green-100 text-green-700 border-green-200',
  draft: 'bg-amber-100 text-amber-700 border-amber-200',
  scheduled: 'bg-sky-100 text-sky-700 border-sky-200',
};

export default function PostList({ typeId }: { typeId: string }) {
  const router = useRouter();
  const type = POST_TYPES[typeId];
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [q, setQ] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/posts?type=${typeId}`);
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/admin/posts?type=${typeId}`);
      const data = await res.json();
      if (!cancelled) {
        setPosts(data.posts || []);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [typeId]);

  const filtered = useMemo(
    () =>
      posts.filter(p => {
        const statusOk = status === 'all' || p.status === status;
        const qOk = !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.slug.toLowerCase().includes(q.toLowerCase());
        return statusOk && qOk;
      }),
    [posts, status, q],
  );

  const remove = async (slug: string) => {
    if (!window.confirm(`Delete "${slug}"? This removes the markdown file and commits the deletion.`)) return;
    setDeleting(slug);
    await fetch(`/api/admin/posts/${typeId}/${slug}`, { method: 'DELETE' });
    setDeleting(null);
    await load();
    router.refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin" className="text-sm text-zinc-500 hover:text-red-600">← Dashboard</Link>
          <h1 className="text-2xl font-black mt-1">
            {type.icon} {type.label}
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            Categories: <span className="text-zinc-700 font-semibold">{type.categories.join(', ')}</span>
          </p>
        </div>
        <Link
          href={`/admin/${typeId}/new`}
          className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-colors"
        >
          + New {type.singular}
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(['all', 'published', 'draft', 'scheduled'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              status === s ? 'bg-zinc-950 text-white border-zinc-950' : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
            }`}
          >
            {s[0].toUpperCase() + s.slice(1)}
          </button>
        ))}
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search title or slug…"
          className="ml-auto px-3 py-1.5 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:border-red-400 w-56"
        />
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
        {loading && <p className="p-6 text-sm text-zinc-400">Loading…</p>}
        {!loading && filtered.length === 0 && <p className="p-6 text-sm text-zinc-400">No posts yet. Create your first {type.singular}.</p>}
        {filtered.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 hidden md:table-cell">Category</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 hidden lg:table-cell">Author</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.slug} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/${typeId}/${p.slug}`} className="font-semibold text-zinc-800 hover:text-red-600">
                      {p.title}
                    </Link>
                    <div className="text-xs text-zinc-400 font-mono">{p.slug}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${statusColor[p.status] || 'bg-zinc-100 text-zinc-600'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-zinc-600">{p.category}</td>
                  <td className="px-5 py-3 text-zinc-500">{p.date || p.updatedAt || '—'}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-zinc-500">{p.author || '—'}</td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <Link href={`/admin/${typeId}/${p.slug}`} className="text-red-600 hover:text-red-500 font-semibold mr-3">
                      Edit
                    </Link>
                    <a
                      href={`/${p.lang || 'en'}/${typeId === 'securitySystem' ? 'security' : 'blog'}/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-zinc-700 mr-3"
                    >
                      View
                    </a>
                    <button
                      onClick={() => void remove(p.slug)}
                      disabled={deleting === p.slug}
                      className="text-red-500 hover:text-red-700 disabled:opacity-40"
                    >
                      {deleting === p.slug ? '…' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
