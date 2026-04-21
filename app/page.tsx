import { redirect } from 'next/navigation';
import { requireHousehold } from '@/lib/auth/household';
import { HomesteadApp } from './components/HomesteadApp';

export default async function Page() {
  const { household } = await requireHousehold();
  if (!household.setupCompleteAt) redirect('/setup');
  return <HomesteadApp />;
}
