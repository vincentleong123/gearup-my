import LazyContentCreator from '@/components/LazyContentCreator';
import { langAlternates } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  return {
    title: 'Creator Toolkit — Draft Gear Content Faster',
    description: 'Generate SEO articles for camera reviews, price comparisons, and ROI guides in seconds.',
    robots: { index: false, follow: false },
    ...langAlternates(lang, '/creator'),
  };
}

export default function CreatorPage() {
  return <LazyContentCreator />;
}
