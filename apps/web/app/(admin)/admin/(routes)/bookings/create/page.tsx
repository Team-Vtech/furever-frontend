import { Suspense } from "react";
import { PageLayout } from "../../../shared/components/PageLayout/PageLayout";
import { BookingCreateScreen } from "../../../featured/bookings/screens/BookingCreateScreen/BookingCreateScreen";

export default function CreateBookingPage() {
  return (
    <PageLayout
      title="Create New Booking"
      description="Fill out the form to create a new booking"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Bookings", href: "/admin/bookings" },
        { label: "Create" },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <BookingCreateScreen />
      </Suspense>
    </PageLayout>
  );
}
