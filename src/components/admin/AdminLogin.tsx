'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_ROUTES } from '@/lib/cms/auth';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [defaultWarning, setDefaultWarning] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Wrong password');
        return;
      }
      router.push(ADMIN_ROUTES.dashboard);
      router.refresh();
    } catch {
      setError('Request failed — is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-red-500 to-fuchsia-600 text-2xl font-black shadow-lg shadow-pink-600/30">
            K
          </div>
          <h1 className="text-2xl font-black">Kameralog CMS</h1>
          <p className="text-zinc-400 text-sm mt-1">Sign in to manage content</p>
        </div>

        <form onSubmit={submit} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1.5">Admin password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-400 font-semibold">{error}</p>}
          {defaultWarning && (
            <p className="text-xs text-amber-400">
              Using the default password. Set <code className="font-mono">ADMIN_PASSWORD</code> in your environment for production.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setDefaultWarning(w => !w);
          }}
          className="mt-4 w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Need setup help?
        </button>
      </div>
    </div>
  );
}
