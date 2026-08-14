/**
 * Git integration for the CMS panel. After the admin saves content we commit
 * it to the repo so the git history stays the source of truth, matching the
 * "local authoring + git + rebuild" workflow.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve } from 'node:path';

const exec = promisify(execFile);

export interface CommitResult {
  ok: boolean;
  message: string;
}

/** Commit content changes. Returns {ok:true} when a commit was created. */
export async function commitContent(summary: string): Promise<CommitResult> {
  const cwd = resolve(process.cwd());
  try {
    await exec('git', ['add', 'content'], { cwd });
    const { stdout } = await exec('git', ['status', '--porcelain', '--', 'content'], { cwd });
    if (!stdout.trim()) {
      return { ok: false, message: 'No content changes to commit' };
    }
    const { stdout: commitOut } = await exec('git', ['commit', '-m', summary, '--', 'content'], { cwd });
    return { ok: true, message: commitOut.trim().split('\n')[0] || 'Committed content changes' };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, message: msg };
  }
}
