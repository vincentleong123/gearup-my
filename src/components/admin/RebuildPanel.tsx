'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RebuildPanel({ onBeforeRebuild }: { onBeforeRebuild?: () => Promise<{ ok: boolean; message?: string }> }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<{ ok: boolean; message?: string } | null>(null);

  const rebuild = async () => {
    if (busy) return;
    setBusy(true);
    setLog([]);
    setResult(null);

    if (onBeforeRebuild) {
      const saved = await onBeforeRebuild();
      if (!saved.ok) {
        setResult({ ok: false, message: saved.message || 'Save failed — nothing rebuilt.' });
        setBusy(false);
        return;
      }
    }

    try {
      const res = await fetch('/api/admin/rebuild', { method: 'POST' });
      if (!res.ok || !res.body) {
        setResult({ ok: false, message: `Rebuild request failed (${res.status})` });
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const msg = JSON.parse(line);
            if (msg.type === 'line') setLog(prev => [...prev, msg.line]);
            else if (msg.type === 'done' || msg.type === 'error') setResult({ ok: !!msg.ok, message: msg.error });
          } catch {
            // ignore partial JSON
          }
        }
      }
    } catch (err) {
      setResult({ ok: false, message: err instanceof Error ? err.message : 'Rebuild failed' });
    } finally {
      setBusy(false);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={rebuild}
        disabled={busy}
        className="px-4 py-2 rounded-xl bg-zinc-950 text-white text-sm font-bold hover:bg-zinc-800 disabled:opacity-50 transition-all"
      >
        {busy ? 'Rebuilding…' : '⚡ Rebuild site'}
      </button>
      {result && (
        <p className={`text-xs font-semibold ${result.ok ? 'text-green-600' : 'text-red-600'} max-w-md text-right`}>
          {result.ok ? 'Site rebuilt.' : `Build failed: ${result.message}`}
          {!result.ok && <span className="block text-zinc-500 font-normal mt-0.5">Restart `next start` to serve the last good build.</span>}
        </p>
      )}
      {log.length > 0 && (
        <pre className="text-[11px] leading-relaxed bg-zinc-900 text-green-300 rounded-xl p-3 max-h-48 overflow-auto w-full whitespace-pre-wrap">
          {log.join('\n')}
        </pre>
      )}
    </div>
  );
}
