import { Suspense } from 'react';
import { DashboardScreen } from '../featured/dashboard/screens/DashboardScreen';
import { PageLayout } from '@/app/shared/components/PageLayout/PageLayout';
import { JsonResponse } from '@/app/shared/types/general';
import { BookingStatistics } from '@furever/types';
import { server } from '../shared/utils/http.server.utils';

export default async function ProviderDashboardPage() {
  const statistics = await getBookingsStatistics();

  if (!statistics?.data) {
    return <div>No statistics available</div>;
  }
  return (
    <PageLayout
      title="Dashboard"
      breadcrumbs={[]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardScreen statistics={statistics.data.data} />
      </Suspense>
    </PageLayout>
  );
}

async function getBookingsStatistics() {
  return await (
    await server()
  ).get<JsonResponse<BookingStatistics>>('/admin/bookings/statistics');
}
