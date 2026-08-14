import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPostType } from '@/admin/types';
import { listPosts, postExists, safeSlug, savePost } from '@/lib/cms/fs';
import { commitContent } from '@/lib/cms/git';
import { tokenMatches } from '@/lib/cms/auth';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const store = await cookies();
  if (!(await tokenMatches(store.get('kg_admin')?.value))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const typeId = url.searchParams.get('type') || '';
  const type = getPostType(typeId);
  if (!type) return NextResponse.json({ error: `Unknown post type: ${typeId}` }, { status: 400 });

  const posts = await listPosts(type);
  return NextResponse.json({ ok: true, posts, typeId });
}

export async function POST(request: Request) {
  const store = await cookies();
  if (!(await tokenMatches(store.get('kg_admin')?.value))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { type?: string; slug?: string; values?: Record<string, unknown> };
  const type = getPostType(body.type || '');
  if (!type) return NextResponse.json({ error: `Unknown post type: ${body.type}` }, { status: 400 });

  let slug: string;
  try {
    slug = safeSlug(body.slug || '');
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Invalid slug' }, { status: 400 });
  }
  if (!body.values?.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

  if (await postExists(type, slug)) {
    return NextResponse.json({ error: `"${slug}" already exists in ${type.folder}/` }, { status: 409 });
  }

  const saved = await savePost(type, slug, body.values);
  const commit = await commitContent(`cms: create ${type.singular.toLowerCase()} "${body.values.title}"`);

  return NextResponse.json({ ok: true, slug, fileName: saved.fileName, commit }, { status: 201 });
}
