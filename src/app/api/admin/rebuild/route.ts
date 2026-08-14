import { cookies } from 'next/headers';
import { tokenMatches } from '@/lib/cms/auth';
import { runRebuild } from '@/lib/cms/build';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(_request: Request) {
  const store = await cookies();
  if (!(await tokenMatches(store.get('kg_admin')?.value))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const enc = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (obj: unknown) => {
        try {
          controller.enqueue(enc.encode(JSON.stringify(obj) + '\n'));
        } catch {
          // stream closed
        }
      };
      send({ type: 'start', note: 'Rebuilding site — this can take a couple of minutes.' });
      const result = await runRebuild(line => send({ type: 'line', line }));
      send({ type: result.ok ? 'done' : 'error', ok: result.ok, error: result.error, count: result.lines.length });
      try {
        controller.close();
      } catch {
        // already closed
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
