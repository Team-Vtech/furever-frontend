import { Suspense } from 'react';
import { PageLayout } from '@/app/shared/components/PageLayout/PageLayout';
import { BookingsListScreen } from '../../featured/bookings/screens/BookingsListScreen/BookingsListScreen';
import { Button } from '@furever/ui/components/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function BookingsPage() {
  return (
    <PageLayout
      title="Bookings Management"
      description="Manage customer bookings and appointments"
      breadcrumbs={[
        { label: 'Bookings', href: '/bookings' },
        { label: 'List' },
      ]}
      actions={
        <Button asChild>
          <Link href="/bookings/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Booking
          </Link>
        </Button>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <BookingsListScreen />
      </Suspense>
    </PageLayout>
  );
}
