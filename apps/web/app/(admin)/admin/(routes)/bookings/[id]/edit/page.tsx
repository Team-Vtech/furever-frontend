import { Suspense } from "react";
import { BookingEditScreen } from "../../../../featured/bookings/screens/BookingEditScreen/BookingEditScreen";

interface EditBookingPageProps {
  params: {
    id: string;
  };
}

export default function EditBookingPage({ params }: EditBookingPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingEditScreen bookingId={params.id} />
    </Suspense>
  );
}
