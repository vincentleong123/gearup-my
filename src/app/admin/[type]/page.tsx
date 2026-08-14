import { notFound } from 'next/navigation';
import { getPostType } from '@/admin/types';
import PostList from '@/components/admin/PostList';

export const dynamic = 'force-dynamic';

export default async function TypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!getPostType(type)) notFound();
  return <PostList typeId={type} />;
}
