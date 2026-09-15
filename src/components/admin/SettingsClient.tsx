'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SiteSettings } from '@/lib/cms/settings';

const FIELDS: { key: keyof SiteSettings; label: string; type: 'text' | 'textarea' | 'url'; hint?: string }[] = [
  { key: 'siteName', label: 'Site name', type: 'text', hint: 'Shown in the browser tab and branding' },
  { key: 'siteUrl', label: 'Site URL', type: 'url', hint: 'Canonical base URL, no trailing slash' },
  { key: 'tagline', label: 'Tagline', type: 'text', hint: 'Short one-liner under the logo' },
  { key: 'metaTitle', label: 'Default meta title', type: 'text', hint: 'Used for the homepage <title>' },
  { key: 'metaDescription', label: 'Default meta description', type: 'textarea' },
  { key: 'ogTitle', label: 'Social share title (OG)', type: 'text' },
  { key: 'ogDescription', label: 'Social share description (OG)', type: 'textarea' },
  { key: 'ogImage', label: 'Social share image path', type: 'text', hint: 'e.g. /og-image.png' },
  { key: 'contactEmail', label: 'Contact email', type: 'text' },
  { key: 'gscVerification', label: 'Google Search Console verification', type: 'text' },
  { key: 'ga4Id', label: 'Google Analytics 4 ID', type: 'text', hint: 'e.g. G-XXXXXXXXXX' },
];

export default function SettingsClient({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [form, setForm] = useState<SiteSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(key: keyof SiteSettings, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        setForm(data.settings);
        setSaved(true);
        router.refresh();
        setTimeout(() => setSaved(false), 3000);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Failed to save settings');
      }
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Brand, SEO defaults and analytics for the whole site</p>
      </div>

      {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium">{error}</div>}
      {saved && <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-700 text-sm font-medium">Settings saved.</div>}

      <form onSubmit={submit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">General</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIELDS.map(f => (
              <div key={f.key} className={f.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                  {f.label}
                  {f.hint && <span className="font-normal normal-case text-gray-400 ml-1.5">— {f.hint}</span>}
                </label>
                {f.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={form[f.key]}
                    onChange={e => update(f.key, e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900"
                  />
                ) : (
                  <input
                    type={f.type}
                    value={form[f.key]}
                    onChange={e => update(f.key, e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save settings'}
          </button>
          <span className="text-xs text-gray-400">Stored in content/settings.json and committed to git</span>
        </div>
      </form>
    </div>
  );
}