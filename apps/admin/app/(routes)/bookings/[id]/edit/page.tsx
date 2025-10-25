import { Booking, JsonResponse, PaginatedJsonResponse, Provider } from "@furever/types";
import { Suspense } from "react";
import { BookingEditScreen } from "../../../../featured/bookings/screens/BookingEditScreen/BookingEditScreen";

import { server } from "@/app/shared/utils/http.server.utils";
import { notFound } from "next/navigation";

interface EditBookingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditBookingPage({ params }: EditBookingPageProps) {
    const { id } = await params;
    if (!id) {
        return notFound();
    }
    const booking = (await getBookingById(id)).data.data;
    const providers = (await getProviders()).data.data.data;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingEditScreen booking={booking} providers={providers} />
        </Suspense>
    );
}

async function getProviders() {
    return await (
        await server()
    ).get<
        PaginatedJsonResponse<{
            data: Provider[];
        }>
    >("/admin/providers");
}

async function getBookingById(id: string) {
    return await (await server()).get<JsonResponse<Booking>>(`/admin/bookings/${id}`);
}
