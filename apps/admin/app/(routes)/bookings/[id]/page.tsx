import { Suspense } from "react";
import { BookingDetailScreen } from "../../../featured/bookings/screens/BookingDetailScreen/BookingDetailScreen";
import { server } from "@/app/shared/utils/http.server.utils";
import { Booking, JsonResponse } from "@furever/types";
import { notFound } from "next/navigation";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Button } from "@furever/ui/components/button";
import Link from "next/link";
import { Edit } from "lucide-react";

interface BookingDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const booking = (await getBookingById(id)).data.data;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageLayout
        title={`Booking Details - ${booking.id}`}
        actions={
          <div className="flex gap-2">
            <Button asChild>
              <Link href={`/bookings/${booking.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Booking
              </Link>
            </Button>
          </div>
        }
        breadcrumbs={[
          { label: `Booking ${booking.id}`, href: "#" },
          { label: "Bookings", href: "/bookings" },
        ]}
      >
        <BookingDetailScreen booking={booking} />
      </PageLayout>
    </Suspense>
  );
}

async function getBookingById(id: string) {
  return await (
    await server()
  ).get<JsonResponse<Booking>>(`/admin/bookings/${id}`);
}
