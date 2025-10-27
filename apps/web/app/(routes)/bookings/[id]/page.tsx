import { BookingDetailsScreen } from "@/app/featured/bookings/screens/BookingDetailsScreen/BookingDetailsScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";
import { server } from "@/app/shared/utils/http.server.utils";
import { Booking, JsonResponse } from "@furever/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Booking Details | Furever",
    description: "View details of your pet care service booking including appointment time, provider information, and service details.",
};

interface BookingDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
    const { id } = await params;
    const booking = await getBookingById(id);
    const payment = await getBookingPayment(id);
    if (!booking) {
        notFound();
    }

    return (
        <Suspense>
            <MainLayout>
                <BookingDetailsScreen booking={booking} payment={payment} />
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

async function getBookingPayment(id: string): Promise<{ pay_link: string; _ptxn: string } | { is_paid: boolean } | null> {
    try {
        const response = await (
            await server()
        ).get<
            JsonResponse<
                | {
                      pay_link: string;
                      _ptxn: string;
                  }
                | {
                      is_paid: boolean;
                  }
            >
        >(`/bookings/${id}/payment`);
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch booking payment url:", error);
        return null;
    }
}
