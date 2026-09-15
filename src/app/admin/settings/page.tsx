import SettingsClient from '@/components/admin/SettingsClient';
import { readSettings } from '@/lib/cms/settings';

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await readSettings();
  return <SettingsClient initial={settings} />;
}