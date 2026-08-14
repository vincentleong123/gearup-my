/**
 * Server-side markdown content store for the Kameralog CMS panel.
 *
 * The site's source of truth is git-tracked markdown in content/<folder>.
 * The admin panel reads and writes these files directly on this machine
 * (dev: the working copy, prod: the deployed checkout via the cloudflared
 * tunnel to this PC).
 */
import { promises as fs } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import matter from 'gray-matter';
import { valuesToFrontmatter, type PostTypeDef } from '@/admin/types';

export interface StoredPost {
  slug: string;
  title: string;
  status: string;
  category: string;
  date: string;
  updatedAt?: string;
  author?: string;
  lang?: string;
  fileName: string;
}

export function contentRoot(): string {
  return resolve(process.cwd(), 'content');
}

export function postDir(type: PostTypeDef): string {
  return resolve(contentRoot(), type.folder);
}

/** Ensure a slug only ever resolves inside its own post-type folder. */
export function safeSlug(slug: string): string {
  const cleaned = slug.replace(/\\/g, '/').split('/').pop() || '';
  const base = cleaned.replace(/\.md$/i, '');
  if (!/^[a-z0-9][a-z0-9-]{1,120}$/i.test(base)) {
    throw new Error(`Invalid slug: "${slug}"`);
  }
  return base;
}

export async function listPosts(postType: PostTypeDef): Promise<StoredPost[]> {
  const dir = postDir(postType);
  await fs.mkdir(dir, { recursive: true });
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const posts: StoredPost[] = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    try {
      const raw = await fs.readFile(join(dir, entry.name), 'utf8');
      const { data } = matter(raw);
      posts.push({
        slug: String(data.slug || entry.name.replace(/\.md$/, '')),
        title: String(data.title || entry.name.replace(/\.md$/, '')),
        status: String(data.status || 'published'),
        category: String(data.category || ''),
        date: String(data.date || data.publishDate || '').slice(0, 10),
        updatedAt: data.updatedAt ? String(data.updatedAt).slice(0, 10) : undefined,
        author: data.author ? String(data.author) : undefined,
        lang: data.lang ? String(data.lang) : undefined,
        fileName: entry.name,
      });
    } catch {
      // skip unreadable / partial files
    }
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

export interface ReadPost {
  slug: string;
  fileName: string;
  values: Record<string, unknown>;
}

export async function readPost(postType: PostTypeDef, slug: string): Promise<ReadPost> {
  const fileName = `${safeSlug(slug)}.md`;
  const file = join(postDir(postType), fileName);
  const raw = await fs.readFile(file, 'utf8');
  const { data, content } = matter(raw);
  const values = Object.fromEntries(
    postType.fields
      .filter(f => f.name !== 'body')
      .map(f => {
        const v = (data as Record<string, unknown>)[f.name];
        return [f.name, v];
      }),
  );
  return { slug: safeSlug(slug), fileName, values: { ...values, body: content } };
}

export interface SaveResult {
  fileName: string;
  changed: boolean;
}

/**
 * Serialize values into a markdown file. Returns changed=false when the file
 * is already byte-identical so we don't create empty git commits.
 */
export async function savePost(
  postType: PostTypeDef,
  slug: string,
  values: Record<string, unknown>,
): Promise<SaveResult> {
  const safe = safeSlug(slug);
  const dir = postDir(postType);
  await fs.mkdir(dir, { recursive: true });

  const frontmatter = valuesToFrontmatter(values, postType.fields);
  const body = typeof values.body === 'string' ? values.body : '';
  const next = matter.stringify(body, frontmatter);

  const fileName = `${safe}.md`;
  const file = join(dir, fileName);
  let changed = true;
  try {
    const current = await fs.readFile(file, 'utf8');
    if (current === next) changed = false;
  } catch {
    // new file
  }
  if (changed) {
    await fs.writeFile(file, next, 'utf8');
  }
  return { fileName, changed };
}

export async function deletePost(postType: PostTypeDef, slug: string): Promise<boolean> {
  const fileName = `${safeSlug(slug)}.md`;
  try {
    await fs.unlink(join(postDir(postType), fileName));
    return true;
  } catch {
    return false;
  }
}

export async function postExists(postType: PostTypeDef, slug: string): Promise<boolean> {
  const fileName = `${safeSlug(slug)}.md`;
  try {
    await fs.access(join(postDir(postType), fileName));
    return true;
  } catch {
    return false;
  }
}

/** Preview helper: read a post's markdown for ?preview=1 rendering in dev. */
export async function readRawForPreview(postType: PostTypeDef, slug: string): Promise<ReadPost | null> {
  try {
    return await readPost(postType, slug);
  } catch {
    return null;
  }
}

export { sep };
