import { Suspense } from "react";
import { BookingDetailScreen } from "../../../featured/bookings/screens/BookingDetailScreen/BookingDetailScreen";

interface BookingDetailPageProps {
  params: {
    id: string;
  };
}

export default function BookingDetailPage({ params }: BookingDetailPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingDetailScreen bookingId={params.id} />
    </Suspense>
  );
}
