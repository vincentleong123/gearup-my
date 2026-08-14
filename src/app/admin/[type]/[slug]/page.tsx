import { notFound } from 'next/navigation';
import { getPostType } from '@/admin/types';
import { readPost } from '@/lib/cms/fs';
import PostEditor from '@/components/admin/PostEditor';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ type: string; slug: string }> }) {
  const { type, slug } = await params;
  const postType = getPostType(type);
  if (!postType) notFound();

  let post;
  try {
    post = await readPost(postType, slug);
  } catch {
    notFound();
  }

  return <PostEditor typeId={type} slug={post.slug} initialValues={post.values} />;
}
