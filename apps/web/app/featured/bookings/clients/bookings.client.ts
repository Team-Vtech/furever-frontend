import { client } from "@/app/shared/utils/http.client.utils";
import { Booking, JsonResponse, PaginatedJsonResponse } from "@furever/types";
import { BookingFormValues } from "../types/booking.types";

export const BookingsClient = {
    async createBooking(data: BookingFormValues) {
        const response = await client().post<JsonResponse<Booking>>("/api/bookings", data);
        return response.data;
    },

    async getBookings({ queryKey }: { queryKey: string[] }) {
        const response = await client().get<
            PaginatedJsonResponse<{
                data: Booking[];
            }>
        >("/api/bookings", {
            params: new URLSearchParams(queryKey[1]),
        });
        return response.data;
    },

    async getBooking(id: string | number) {
        const response = await client().get<JsonResponse<Booking>>(`/api/bookings/${id}`);
        return response.data;
    },

    async cancelBooking(id: string | number) {
        const response = await client().patch<JsonResponse<Booking>>(`/api/bookings/${id}/cancel`);
        return response.data;
    },
};
