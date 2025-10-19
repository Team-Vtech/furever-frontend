import { BookingDetailsScreen } from "@/app/featured/bookings/screens/BookingDetailsScreen/BookingDetailsScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";
import { server } from "@/app/shared/utils/http.server.utils";
import { Booking, JsonResponse } from "@furever/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface BookingDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
    const { id } = await params;
    const booking = await getBookingById(id);

    if (!booking) {
        notFound();
    }

    return (
        <Suspense>
            <MainLayout>
                <BookingDetailsScreen booking={booking} />
            </MainLayout>
        </Suspense>
    );
}

async function getBookingById(id: string): Promise<Booking | null> {
    try {
        const response = await (await server()).get<JsonResponse<Booking>>(`/bookings/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch booking:", error);
        return null;
    }
}
