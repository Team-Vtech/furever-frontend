import { PageLayout } from '@/app/shared/components/PageLayout/PageLayout';
import { PaginatedJsonResponse } from '@/app/shared/types/general';
import { Provider } from '@furever/types';
import { Suspense } from 'react';
import { BookingCreateScreen } from '../../../featured/bookings/screens/BookingCreateScreen/BookingCreateScreen';
import { server } from '@/app/shared/utils/http.server.utils';

export default async function CreateBookingPage() {
  const providers = await getProviders();
  return (
    <PageLayout
      title="Create New Booking"
      description="Fill out the form to create a new booking"
      breadcrumbs={[
        { label: 'Bookings', href: '/bookings' },
        { label: 'Create' },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <BookingCreateScreen providers={providers.data.data.data} />
      </Suspense>
    </PageLayout>
  );
}

async function getProviders() {
  return await (
    await server()
  ).get<
    PaginatedJsonResponse<{
      data: Provider[];
    }>
  >('/admin/providers');
}
