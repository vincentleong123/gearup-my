import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPostType } from '@/admin/types';
import { listPosts, readPost, patchPostSeo, safeSlug } from '@/lib/cms/fs';
import { readSettings } from '@/lib/cms/settings';
import { commitContent } from '@/lib/cms/git';
import { tokenMatches } from '@/lib/cms/auth';

export const runtime = 'nodejs';

const SEO_TYPES = ['article', 'securitySystem'] as const;

async function authorize(): Promise<boolean> {
  const store = await cookies();
  return tokenMatches(store.get('kg_admin')?.value);
}

export async function GET() {
  if (!(await authorize())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const global = await readSettings();
  const entities: Array<{
    typeId: string;
    slug: string;
    title: string;
    status: string;
    seoTitle: string;
    seoDescription: string;
    path: string;
  }> = [];

  for (const typeId of SEO_TYPES) {
    const type = getPostType(typeId);
    if (!type) continue;
    const posts = await listPosts(type);
    for (const p of posts) {
      try {
        const post = await readPost(type, p.slug);
        entities.push({
          typeId,
          slug: p.slug,
          title: p.title,
          status: p.status,
          seoTitle: String(post.values.seoTitle || ''),
          seoDescription: String(post.values.seoDescription || ''),
          path: `/${typeId === 'securitySystem' ? 'security' : 'blog'}/${p.slug}`,
        });
      } catch {
        // skip unreadable post
      }
    }
  }

  return NextResponse.json({ ok: true, global, entities });
}

export async function POST(request: Request) {
  if (!(await authorize())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as {
    type?: string;
    slug?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  const type = getPostType(body.type || '');
  if (!type) return NextResponse.json({ error: `Unknown post type: ${body.type}` }, { status: 400 });

  let slug: string;
  try {
    slug = safeSlug(body.slug || '');
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Invalid slug' }, { status: 400 });
  }

  const patch = {
    ...(body.seoTitle !== undefined ? { seoTitle: body.seoTitle } : {}),
    ...(body.seoDescription !== undefined ? { seoDescription: body.seoDescription } : {}),
  };

  let result: { changed: boolean };
  try {
    result = await patchPostSeo(type, slug, patch);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const commit = await commitContent(`cms: seo update "${slug}"`);
  return NextResponse.json({ ok: true, changed: result.changed, commit });
}