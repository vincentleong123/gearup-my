'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { SiteSettings } from '@/lib/cms/settings';

interface SeoEntity {
  typeId: string;
  slug: string;
  title: string;
  status: string;
  seoTitle: string;
  seoDescription: string;
  path: string;
}

const statusColor: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-amber-100 text-amber-700',
  scheduled: 'bg-sky-100 text-sky-700',
};

export default function SeoClient() {
  const [global, setGlobal] = useState<SiteSettings | null>(null);
  const [entities, setEntities] = useState<SeoEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editing, setEditing] = useState<SeoEntity | null>(null);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch('/api/admin/seo');
      const data = await res.json();
      if (!cancelled && res.ok) {
        setGlobal(data.global);
        setEntities(data.entities);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () =>
      entities.filter(e => {
        const typeOk = typeFilter === 'all' || e.typeId === typeFilter;
        const statusOk = statusFilter === 'all' || e.status === statusFilter;
        const qOk = !q || e.title.toLowerCase().includes(q.toLowerCase()) || e.slug.toLowerCase().includes(q.toLowerCase());
        return typeOk && statusOk && qOk;
      }),
    [entities, q, typeFilter, statusFilter],
  );

  function startEdit(e: SeoEntity) {
    setEditing(e);
    setSeoTitle(e.seoTitle);
    setSeoDescription(e.seoDescription);
    setNotice(null);
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setNotice(null);
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: editing.typeId,
          slug: editing.slug,
          seoTitle,
          seoDescription,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setNotice({ kind: 'ok', text: data.changed === false ? 'No changes.' : 'SEO saved. Commit created.' });
        setEntities(prev =>
          prev.map(x => (x.slug === editing.slug && x.typeId === editing.typeId ? { ...x, seoTitle, seoDescription } : x)),
        );
        setEditing(null);
      } else {
        setNotice({ kind: 'err', text: data.error || 'Save failed' });
      }
    } catch {
      setNotice({ kind: 'err', text: 'Network error' });
    } finally {
      setSaving(false);
    }
  }

  const serp = editing
    ? {
        title: (seoTitle || editing.title).slice(0, 63),
        desc: (seoDescription || '').slice(0, 155),
      }
    : null;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">SEO Manager</h2>
        <p className="text-sm text-gray-500 mt-1">Per-post meta titles &amp; descriptions — powers search results</p>
      </div>

      {notice && (
        <p className={`mb-4 px-4 py-2 rounded-lg text-sm font-semibold ${notice.kind === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
          {notice.text}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Post SEO table */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search title or slug…"
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-zinc-900 w-56"
            />
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-zinc-900"
            >
              <option value="all">All types</option>
              <option value="article">Creator Articles</option>
              <option value="securitySystem">Security Systems</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-zinc-900"
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
            <span className="ml-auto text-xs text-gray-400">{filtered.length} posts</span>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-400 text-sm">No posts match your filters.</div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-gray-500 bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 font-medium">Post</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">SEO Title</th>
                      <th className="px-4 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map(e => (
                      <tr key={`${e.typeId}:${e.slug}`} className="hover:bg-gray-50/50 align-top">
                        <td className="px-4 py-3">
                          <Link href={`/admin/${e.typeId}/${e.slug}`} className="font-semibold text-gray-800 hover:text-red-600">
                            {e.title}
                          </Link>
                          <div className="text-xs text-gray-400 font-mono">{e.slug}</div>
                          <div className="text-xs text-gray-400">{e.typeId}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${statusColor[e.status] || 'bg-gray-100 text-gray-600'}`}>
                            {e.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className={`text-gray-600 line-clamp-2 ${e.seoTitle ? '' : 'italic text-gray-300'}`}>
                            {e.seoTitle || 'No custom SEO title — defaults used'}
                          </p>
                          <p className={`text-xs mt-1 line-clamp-2 ${e.seoDescription ? 'text-gray-500' : 'italic text-gray-300'}`}>
                            {e.seoDescription || 'No custom SEO description'}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <button onClick={() => startEdit(e)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                            Edit SEO
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Side column: editor + global */}
        <div className="space-y-6">
          {(editing || serp) && editing && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Edit SEO</h3>
                <button onClick={() => setEditing(null)} className="text-xs text-gray-400 hover:text-gray-700">
                  Close
                </button>
              </div>
              <p className="text-sm text-gray-600 font-medium mb-3">{editing.title}</p>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                SEO title <span className="font-normal normal-case text-gray-400">({seoTitle.length}/60)</span>
              </label>
              <input
                value={seoTitle}
                onChange={e => setSeoTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900"
              />
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 mt-3">
                SEO description <span className="font-normal normal-case text-gray-400">({seoDescription.length}/155)</span>
              </label>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={e => setSeoDescription(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900"
              />

              {serp && (
                <div className="mt-4 p-4 rounded-lg border border-gray-200 bg-white">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Google preview</p>
                  <p className="text-[#1a0dab] text-lg leading-snug hover:underline">{serp.title}</p>
                  <p className="text-[#006621] text-xs mt-1">kameralog.com › {editing.path.replace(/^\//, '')}</p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-3">{serp.desc || global?.metaDescription || ''}</p>
                </div>
              )}

              <button
                onClick={() => void save()}
                disabled={saving}
                className="mt-4 w-full px-4 py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save SEO'}
              </button>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Global Defaults</h3>
              <Link href="/admin/settings" className="text-xs text-zinc-900 font-semibold hover:underline">
                Edit in Settings
              </Link>
            </div>
            {global ? (
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Meta title</p>
                  <p className="text-gray-700 line-clamp-2">{global.metaTitle}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Meta description</p>
                  <p className="text-gray-700 line-clamp-3">{global.metaDescription}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Social title</p>
                  <p className="text-gray-700 line-clamp-2">{global.ogTitle}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Loading…</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}