/**
 * Rebuild trigger for the CMS panel.
 *
 * - dev: run the sync script so `next dev` picks up regenerated content.
 * - production: run sync + `next build` (writes a new .next), then tell the
 *   user to restart the server so `next start` serves the new build.
 *
 * Output is streamed line-by-line back to the admin UI via NDJSON.
 */
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

export const REBUILD_CHANNEL = 'rebuild' as const;

const IS_PROD = process.env.NODE_ENV === 'production';

export interface RebuildLog {
  ok: boolean;
  lines: string[];
  error?: string;
}

export async function runRebuild(onLine: (line: string) => void): Promise<RebuildLog> {
  const cwd = resolve(process.cwd());
  const command = IS_PROD ? 'npm' : 'node';
  const args = IS_PROD ? ['run', 'build'] : ['scripts/sync-content.mjs'];

  return new Promise(resolveDone => {
    const child = spawn(command, args, { cwd, shell: false });
    const lines: string[] = [];
    let errorTail = '';

    const push = (line: string) => {
      lines.push(line);
      onLine(line);
    };

    child.stdout.on('data', chunk => {
      for (const line of chunk.toString().split(/\r?\n/)) {
        if (line.trim()) push(line);
      }
    });
    child.stderr.on('data', chunk => {
      for (const line of chunk.toString().split(/\r?\n/)) {
        if (line.trim()) {
          lines.push(line);
          errorTail = (errorTail + '\n' + line).trim().slice(-4000);
        }
      }
    });

    child.on('error', err => {
      resolveDone({ ok: false, lines, error: err.message });
    });

    child.on('close', code => {
      const ok = code === 0;
      const tail = errorTail || lines.slice(-15).join('\n');
      resolveDone({ ok, lines, error: ok ? undefined : tail });
    });
  });
}
