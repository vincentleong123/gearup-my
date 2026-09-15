'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface ImageCurationBlock {
  caption?: string;
  context?: string;
  purpose?: string;
  position?: string;
  alt?: string;
  credit?: string;
  sourceUrl?: string;
  filename?: string;
  aspectRatio?: string;
  notes?: string;
  active?: boolean;
  approved?: boolean;
  rejectReason?: string;
}

interface ImageItem {
  articleSlug: string;
  articleTitle: string;
  articleCategory: string;
  blockIndex: number;
  block: ImageCurationBlock;
}

interface ImageStats {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
  withAlt: number;
  withCaption: number;
  withSource: number;
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'no-alt' | 'no-caption';

/** Return a copy of the list with one curation block patched. */
function withBlock(list: ImageItem[], slug: string, index: number, updates: Record<string, unknown>): ImageItem[] {
  return list.map(item =>
    item.articleSlug === slug && item.blockIndex === index
      ? { ...item, block: { ...item.block, ...updates } }
      : item,
  );
}

/** Recompute the summary stats from a full item list. */
function statsFor(list: ImageItem[]): ImageStats {
  const total = list.length;
  const approved = list.filter(i => i.block.approved === true).length;
  const rejected = list.filter(i => i.block.approved === false).length;
  return {
    total,
    approved,
    rejected,
    pending: total - approved - rejected,
    withAlt: list.filter(i => i.block.alt?.trim()).length,
    withCaption: list.filter(i => i.block.caption?.trim()).length,
    withSource: list.filter(i => (i.block.sourceUrl || i.block.filename)?.trim()).length,
  };
}

export default function AdminImagesPage() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [stats, setStats] = useState<ImageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [updating, setUpdating] = useState<string | null>(null);
  const [editingAlt, setEditingAlt] = useState<string | null>(null);
  const [altValue, setAltValue] = useState('');
  const [uploading, setUploading] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  /** cache-busters so freshly uploaded photos re-render immediately */
  const [bust, setBust] = useState<Record<string, number>>({});
  const pickRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadTarget = useRef<{ slug: string; index: number } | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/images')
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setItems(data.items);
          setStats(data.stats);
        }
      })
      .catch(err => console.error('Failed to load images:', err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function updateBlock(slug: string, index: number, updates: Record<string, unknown>) {
    const key = `${slug}-${index}`;
    setUpdating(key);
    try {
      const res = await fetch(`/api/admin/images/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blockIndex: index, ...updates }),
      });
      if (res.ok) {
        setItems(prev => {
          const next = withBlock(prev, slug, index, updates);
          setStats(statsFor(next));
          return next;
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setNotice({ kind: 'err', text: data.error || `Update failed (${res.status})` });
      }
    } catch (err) {
      console.error('Update failed:', err);
      setNotice({ kind: 'err', text: err instanceof Error ? err.message : 'Update failed' });
    } finally {
      setUpdating(null);
    }
  }

  /** Patch a block in local state only (used after a successful upload). */
  function applyLocalUpdate(slug: string, index: number, updates: Record<string, unknown>) {
    setItems(prev => {
      const next = withBlock(prev, slug, index, updates);
      setStats(statsFor(next));
      return next;
    });
  }

  /* ---------- photo upload / camera capture ---------- */
  function openUpload(slug: string, index: number, mode: 'pick' | 'camera') {
    uploadTarget.current = { slug, index };
    setNotice(null);
    (mode === 'camera' ? cameraRef : pickRef).current?.click();
  }

  async function doUpload(file: File) {
    const target = uploadTarget.current;
    if (!target || !file) return;
    const key = `${target.slug}-${target.index}`;
    setUploading(key);
    setNotice(null);
    try {
      const form = new FormData();
      form.append('slug', target.slug);
      form.append('blockIndex', String(target.index));
      form.append('file', file);
      const res = await fetch('/api/admin/images/upload', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setNotice({ kind: 'err', text: data.error || `Upload failed (${res.status})` });
      } else {
        applyLocalUpdate(target.slug, target.index, { filename: data.filename });
        setBust(prev => ({ ...prev, [key]: Date.now() }));
        setNotice({ kind: 'ok', text: `Photo attached — ${data.filename}` });
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setNotice({ kind: 'err', text: err instanceof Error ? err.message : 'Upload failed' });
    } finally {
      setUploading(null);
      uploadTarget.current = null;
      if (pickRef.current) pickRef.current.value = '';
      if (cameraRef.current) cameraRef.current.value = '';
    }
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void doUpload(file);
  }

  async function bulkApprove(slug: string) {
    const articleItems = items.filter(i => i.articleSlug === slug && i.block.approved !== true);
    for (const item of articleItems) {
      await updateBlock(slug, item.blockIndex, { approved: true });
    }
  }

  function startEditAlt(item: ImageItem) {
    const key = `${item.articleSlug}-${item.blockIndex}`;
    setEditingAlt(key);
    setAltValue(item.block.alt || '');
  }

  function saveAlt(slug: string, index: number) {
    updateBlock(slug, index, { alt: altValue });
    setEditingAlt(null);
  }

  const filtered = items.filter(item => {
    switch (filter) {
      case 'pending': return item.block.approved === undefined;
      case 'approved': return item.block.approved === true;
      case 'rejected': return item.block.approved === false;
      case 'no-alt': return !item.block.alt?.trim();
      case 'no-caption': return !item.block.caption?.trim();
      default: return true;
    }
  });

  // Group by article
  const byArticle = new Map<string, ImageItem[]>();
  filtered.forEach(item => {
    const list = byArticle.get(item.articleSlug) || [];
    list.push(item);
    byArticle.set(item.articleSlug, list);
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Image Curation Dashboard</h1>
            <p className="text-zinc-200 mt-1">Review, approve, and manage all article images in one place</p>
          </div>
          <Link href="/admin" className="text-sm text-zinc-200 hover:text-white transition-colors">
            ← Back to Admin
          </Link>
        </div>

        {/* Stats bar */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            {[
              { label: 'Total', value: stats.total, color: 'text-white' },
              { label: 'Approved', value: stats.approved, color: 'text-green-400' },
              { label: 'Rejected', value: stats.rejected, color: 'text-red-400' },
              { label: 'Pending', value: stats.pending, color: 'text-amber-400' },
              { label: 'Has Alt', value: stats.withAlt, color: 'text-blue-400' },
              { label: 'Has Caption', value: stats.withCaption, color: 'text-purple-400' },
              { label: 'Has Source', value: stats.withSource, color: 'text-cyan-400' },
            ].map(s => (
              <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-xs text-zinc-200">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'pending', 'approved', 'rejected', 'no-alt', 'no-caption'] as FilterStatus[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
              }`}
            >
              {f === 'all' ? `All (${stats?.total || 0})` :
               f === 'pending' ? `Pending (${stats?.pending || 0})` :
               f === 'approved' ? `Approved (${stats?.approved || 0})` :
               f === 'rejected' ? `Rejected (${stats?.rejected || 0})` :
               f === 'no-alt' ? `No Alt Text` :
               `No Caption`}
            </button>
          ))}
        </div>

        {/* Upload / camera hidden inputs */}
        <input
          ref={pickRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={onPickFile}
        />
        {/* capture="environment" opens the phone's rear camera directly */}
        <input
          ref={cameraRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          className="hidden"
          onChange={onPickFile}
        />

        {notice && (
          <div
            className={`mb-6 px-4 py-2 rounded-lg text-sm font-semibold border ${
              notice.kind === 'ok'
                ? 'bg-green-500/10 text-green-300 border-green-500/30'
                : 'bg-red-500/10 text-red-300 border-red-500/30'
            }`}
          >
            {notice.text}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-zinc-200">Loading images...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-200">
            No images match this filter. {filter === 'all' ? 'Add [IMAGE CURATION #n] markers to your articles first.' : ''}
          </div>
        ) : (
          <div className="space-y-8">
            {Array.from(byArticle.entries()).map(([slug, articleItems]) => (
              <div key={slug} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
                {/* Article header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                  <div>
                    <Link href={`/blog/${slug}`} className="font-bold hover:text-red-400 transition-colors">
                      {articleItems[0].articleTitle}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                        {articleItems[0].articleCategory}
                      </span>
                      <span className="text-xs text-zinc-200">{articleItems.length} image(s)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => bulkApprove(slug)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-lg transition-all"
                  >
                    Approve All
                  </button>
                </div>

                {/* Image grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {articleItems.map(item => {
                    const imgSrc = item.block.filename || item.block.sourceUrl || '';
                    const key = `${item.articleSlug}-${item.blockIndex}`;
                    const isUpdating = updating === key;
                    const isEditingAlt = editingAlt === key;
                    const isUploading = uploading === key;
                    const isDragging = dragOver === key;
                    const bustedSrc = imgSrc && bust[key] ? `${imgSrc}?v=${bust[key]}` : imgSrc;

                    return (
                      <div key={key} className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl overflow-hidden">
                        {/* Image preview — drop a photo here to attach it */}
                        <div
                          className={`aspect-video bg-zinc-900 relative transition-all ${
                            isDragging ? 'ring-2 ring-blue-400 bg-blue-500/10' : ''
                          }`}
                          onDragOver={e => {
                            e.preventDefault();
                            setDragOver(key);
                          }}
                          onDragLeave={() => setDragOver(prev => (prev === key ? null : prev))}
                          onDrop={e => {
                            e.preventDefault();
                            setDragOver(prev => (prev === key ? null : prev));
                            const file = e.dataTransfer.files?.[0];
                            if (file) {
                              uploadTarget.current = { slug: item.articleSlug, index: item.blockIndex };
                              void doUpload(file);
                            }
                          }}
                        >
                          {bustedSrc ? (
                            // eslint-disable-next-line @next/next/no-img-element -- admin dashboard: arbitrary sources (Unsplash, uploads), no optimizer wanted
                            <img
                              src={bustedSrc}
                              alt={item.block.alt || ''}
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 text-sm gap-1">
                              <span>No image yet</span>
                              <span className="text-xs text-zinc-400">Upload / shoot one below</span>
                            </div>
                          )}
                          {isDragging && (
                            <div className="absolute inset-0 grid place-items-center pointer-events-none">
                              <span className="text-xs font-bold text-blue-200">Drop to attach</span>
                            </div>
                          )}
                          {isUploading && (
                            <div className="absolute inset-0 bg-black/70 grid place-items-center">
                              <span className="text-xs font-bold text-white animate-pulse">Uploading…</span>
                            </div>
                          )}
                          {/* Status badge */}
                          <div className="absolute top-2 left-2">
                            {item.block.approved === true && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/90 text-white">
                                APPROVED
                              </span>
                            )}
                            {item.block.approved === false && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/90 text-white">
                                REJECTED
                              </span>
                            )}
                            {item.block.approved === undefined && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/90 text-white">
                                PENDING
                              </span>
                            )}
                          </div>
                          {/* Block index */}
                          <div className="absolute top-2 right-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-black/60 text-white">
                              #{item.blockIndex + 1}
                            </span>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="p-4 space-y-3">
                          {/* Alt text */}
                          <div>
                            <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Alt Text</label>
                            {isEditingAlt ? (
                              <div className="flex gap-2 mt-1">
                                <input
                                  value={altValue}
                                  onChange={e => setAltValue(e.target.value)}
                                  className="flex-1 bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-1.5 text-sm text-white"
                                  autoFocus
                                  onKeyDown={e => e.key === 'Enter' && saveAlt(item.articleSlug, item.blockIndex)}
                                />
                                <button
                                  onClick={() => saveAlt(item.articleSlug, item.blockIndex)}
                                  className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <p
                                className="text-sm text-zinc-300 mt-1 cursor-pointer hover:text-white transition-colors"
                                onClick={() => startEditAlt(item)}
                              >
                                {item.block.alt || <span className="text-red-400 italic">Missing alt text — click to add</span>}
                              </p>
                            )}
                          </div>

                          {/* Caption */}
                          <div>
                            <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Caption</label>
                            <p className="text-sm text-zinc-200 mt-1">{item.block.caption || '—'}</p>
                          </div>

                          {/* Source */}
                          <div>
                            <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Source</label>
                            <p className="text-xs text-zinc-200 mt-1 truncate">{imgSrc || '—'}</p>
                          </div>

                          {/* Purpose */}
                          {item.block.purpose && (
                            <div>
                              <label className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Purpose</label>
                              <p className="text-xs text-zinc-200 mt-1">{item.block.purpose}</p>
                            </div>
                          )}

                          {/* Reject reason (if rejected) */}
                          {item.block.approved === false && item.block.rejectReason && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                              <label className="text-xs font-bold text-red-400 uppercase tracking-wider">Rejection Reason</label>
                              <p className="text-xs text-red-300 mt-1">{item.block.rejectReason}</p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            <button
                              onClick={() => openUpload(item.articleSlug, item.blockIndex, 'pick')}
                              disabled={isUploading}
                              className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-xs font-bold rounded-lg border border-blue-500/30 transition-all disabled:opacity-50"
                            >
                              {isUploading ? '…' : '📤 Upload'}
                            </button>
                            {/* On a phone this opens the camera directly — shoot straight into the slot */}
                            <button
                              onClick={() => openUpload(item.articleSlug, item.blockIndex, 'camera')}
                              disabled={isUploading}
                              className="flex-1 px-3 py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 text-xs font-bold rounded-lg border border-purple-500/30 transition-all disabled:opacity-50"
                            >
                              📷 Camera
                            </button>
                            {item.block.approved !== true && (
                              <button
                                onClick={() => updateBlock(item.articleSlug, item.blockIndex, { approved: true })}
                                disabled={isUpdating}
                                className="flex-1 px-3 py-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 text-xs font-bold rounded-lg border border-green-500/30 transition-all disabled:opacity-50"
                              >
                                {isUpdating ? '...' : 'Approve'}
                              </button>
                            )}
                            {item.block.approved !== false && (
                              <button
                                onClick={() => {
                                  const reason = prompt('Rejection reason (optional):');
                                  updateBlock(item.articleSlug, item.blockIndex, { approved: false, rejectReason: reason || '' });
                                }}
                                disabled={isUpdating}
                                className="flex-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-bold rounded-lg border border-red-500/30 transition-all disabled:opacity-50"
                              >
                                {isUpdating ? '...' : 'Reject'}
                              </button>
                            )}
                            <Link
                              href={`/admin/article/${item.articleSlug}`}
                              className="px-3 py-2 bg-zinc-700/50 hover:bg-zinc-600/50 text-zinc-200 text-xs font-bold rounded-lg transition-all"
                            >
                              Edit
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
