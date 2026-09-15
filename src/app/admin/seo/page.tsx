import SeoClient from '@/components/admin/SeoClient';

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default function SeoPage() {
  return <SeoClient />;
}