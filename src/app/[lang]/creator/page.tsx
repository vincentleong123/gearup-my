import LazyContentCreator from '@/components/LazyContentCreator';
import { langAlternates } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  return {
    title: 'Content Creator - Gearup.my',
    description: 'Generate SEO articles for camera reviews, price comparisons, and ROI guides in seconds.',
    ...langAlternates(lang, '/creator'),
  };
}

export default function CreatorPage() {
  return <LazyContentCreator />;
}
