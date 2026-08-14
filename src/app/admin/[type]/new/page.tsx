import { notFound } from 'next/navigation';
import { getPostType } from '@/admin/types';
import PostEditor from '@/components/admin/PostEditor';

export const dynamic = 'force-dynamic';

export default async function NewPostPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!getPostType(type)) notFound();
  return <PostEditor typeId={type} />;
}
