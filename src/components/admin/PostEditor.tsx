'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { POST_TYPES, frontmatterToValues } from '@/admin/types';
import type { ImageCurationBlock } from '@/data/content';
import FieldInput from './FieldInput';
import RebuildPanel from './RebuildPanel';
import MarkdownBody from '@/components/MarkdownBody';

const todayIso = () => new Date().toISOString().slice(0, 10);

export default function PostEditor({
  typeId,
  slug,
  initialValues,
}: {
  typeId: string;
  slug?: string;
  initialValues?: Record<string, unknown>;
}) {
  const router = useRouter();
  const type = POST_TYPES[typeId];

  const [values, setValues] = useState<Record<string, unknown>>(() =>
    frontmatterToValues(initialValues || {}, type.fields, typeof initialValues?.body === 'string' ? initialValues.body : ''),
  );
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [savedSlug, setSavedSlug] = useState(slug || '');
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const setValue = (name: string, v: unknown) => setValues(prev => ({ ...prev, [name]: v }));
  const body = typeof values.body === 'string' ? values.body : '';

  const visibleFields = useMemo(
    () => type.fields.filter(f => f.name !== 'body' && (!f.showWhen || values[f.showWhen.field] === f.showWhen.equals)),
    [type.fields, values],
  );

  const imageCuration = Array.isArray(values.imageCuration) ? (values.imageCuration as ImageCurationBlock[]) : [];

  /* ---------- markdown toolbar ---------- */
  const runTool = (kind: string) => {
    const el = bodyRef.current;
    if (!el) return;
    const start = el.selectionStart ?? body.length;
    const end = el.selectionEnd ?? body.length;
    let prefix = '';
    let suffix = '';
    switch (kind) {
      case 'h2':
        prefix = '\n## ';
        break;
      case 'h3':
        prefix = '\n### ';
        break;
      case 'bold':
        prefix = '**';
        suffix = '**';
        break;
      case 'italic':
        prefix = '*';
        suffix = '*';
        break;
      case 'link':
        prefix = '[';
        suffix = '](https://)';
        break;
      case 'img':
        prefix = '![alt](';
        suffix = ')';
        break;
      case 'list':
        prefix = '\n- ';
        break;
      case 'olist':
        prefix = '\n1. ';
        break;
      case 'quote':
        prefix = '\n> ';
        break;
      case 'curation': {
        const count = (body.match(/\[IMAGE CURATION #\d+\]/g) || []).length;
        prefix = `\n\n[IMAGE CURATION #${count + 1}]\n\n`;
        break;
      }
      default:
        return;
    }
    const next = body.slice(0, start) + prefix + body.slice(start, end) + suffix + body.slice(end);
    setValue('body', next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = start + prefix.length;
      el.selectionEnd = end + prefix.length;
    });
  };

  const tools = [
    { kind: 'h2', label: 'H2' },
    { kind: 'h3', label: 'H3' },
    { kind: 'bold', label: 'B' },
    { kind: 'italic', label: 'I' },
    { kind: 'link', label: 'Link' },
    { kind: 'img', label: 'Img' },
    { kind: 'list', label: '• List' },
    { kind: 'olist', label: '1. List' },
    { kind: 'quote', label: 'Quote' },
    { kind: 'curation', label: '🖼️ Curation' },
  ];

  /* ---------- save ---------- */
  const save = async (): Promise<{ ok: boolean; message?: string }> => {
    setSaving(true);
    setNotice(null);
    const targetSlug = savedSlug || (typeof values.slug === 'string' && values.slug.trim() ? values.slug.trim() : '');
    if (!targetSlug) {
      setNotice({ kind: 'err', text: 'Slug is required.' });
      setSaving(false);
      return { ok: false, message: 'Slug is required.' };
    }
    if (!values.title) {
      setNotice({ kind: 'err', text: 'Title is required.' });
      setSaving(false);
      return { ok: false, message: 'Title is required.' };
    }

    const payload = {
      type: typeId,
      slug: targetSlug,
      values: { ...values, updatedAt: todayIso() },
    };

    try {
      const res = savedSlug
        ? await fetch(`/api/admin/posts/${typeId}/${savedSlug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ values: payload.values }),
          })
        : await fetch('/api/admin/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setNotice({ kind: 'err', text: data.error || `Save failed (${res.status})` });
        setSaving(false);
        return { ok: false, message: data.error || 'Save failed' };
      }

      if (!savedSlug && data.slug) {
        setSavedSlug(data.slug);
        setValue('slug', data.slug);
        router.replace(`/admin/${typeId}/${data.slug}`);
      }
      const commit = data.commit?.ok ? ` · committed: ${data.commit.message}` : '';
      const msg = data.changed === false ? 'No changes.' : `Saved ✓${commit}`;
      setNotice({ kind: 'ok', text: msg });
      setSaving(false);
      router.refresh();
      return { ok: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      setNotice({ kind: 'err', text: msg });
      setSaving(false);
      return { ok: false, message: msg };
    }
  };

  const remove = async () => {
    if (!savedSlug) return;
    if (!window.confirm(`Delete "${savedSlug}"? This commits the deletion to git.`)) return;
    const res = await fetch(`/api/admin/posts/${typeId}/${savedSlug}`, { method: 'DELETE' });
    if (res.ok) router.push(`/admin/${typeId}`);
    else setNotice({ kind: 'err', text: 'Delete failed' });
  };

  const crumbs = `/admin/${typeId}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href={crumbs} className="text-sm text-zinc-500 hover:text-red-600">
            ← {type.label}
          </Link>
          <h1 className="text-xl font-black mt-0.5">
            {savedSlug ? `Edit ${type.singular}` : `New ${type.singular}`} — {type.label}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {savedSlug && (
            <button onClick={() => void remove()} className="px-3 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50">
              Delete
            </button>
          )}
          <button
            onClick={() => void save()}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-500 disabled:opacity-50"
          >
            {saving ? 'Saving…' : '💾 Save'}
          </button>
        </div>
      </div>

      {notice && (
        <p className={`px-4 py-2 rounded-lg text-sm font-semibold ${notice.kind === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
          {notice.text}
        </p>
      )}

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Form column */}
        <div className="space-y-5 bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm">
          {visibleFields.map(field => (
            <div key={field.name} className={field.type === 'object' || (field.type === 'list' && field.fields) ? '' : ''}>
              <FieldInput field={field} value={values[field.name]} onChange={v => setValue(field.name, v)} />
            </div>
          ))}
        </div>

        {/* Preview column */}
        <div className="space-y-4 lg:sticky lg:top-20">
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="text-sm font-black">Body — markdown</h2>
              <span className="text-xs text-zinc-400">{body.length} chars</span>
            </div>
            <div className="p-3 border-b border-zinc-100 flex flex-wrap gap-1">
              {tools.map(b => (
                <button
                  key={b.kind}
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => runTool(b.kind)}
                  className="px-2 py-1 rounded-md bg-zinc-100 text-xs font-semibold text-zinc-700 hover:bg-zinc-200"
                >
                  {b.label}
                </button>
              ))}
            </div>
            <textarea
              ref={bodyRef}
              value={body}
              onChange={e => setValue('body', e.target.value)}
              rows={22}
              spellCheck={false}
              className="w-full p-4 font-mono text-[13px] leading-relaxed bg-zinc-950 text-zinc-100 focus:outline-none rounded-b-2xl resize-y"
            />
            <p className="px-4 py-2 text-[11px] text-zinc-400 border-t border-zinc-100">
              Insert <code className="font-mono">🖼️ Curation</code> markers in the body — they render the image-curation blocks at that spot.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-wider text-zinc-300">Live preview</h2>
              <span className="text-[10px] text-zinc-500">public render</span>
            </div>
            <div className="p-5 max-h-[70vh] overflow-y-auto">
              <MarkdownBody content={body} imageCuration={imageCuration} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
        <p className="text-xs text-zinc-500">
          Saves write <code className="font-mono">content/{type.folder}/{'{*}'}.md</code> and commit to git. Rebuild regenerates the site.
        </p>
        <RebuildPanel onBeforeRebuild={save} />
      </div>
    </div>
  );
}
