import { client } from "@/app/shared/utils/http.client.utils";
import { Booking, BookingStatistics, BookingStatus, JsonResponse, PaginatedJsonResponse } from "@furever/types";
import { BookingFormValues } from "../../../(routes)/api/bookings/bookings.schema";
import { ENDPOINTS } from "../constants";

export const BookingsClient = {
    async getBookings({ queryKey }: { queryKey: string[] }) {
        const response = await client().get<
            PaginatedJsonResponse<{
                data: Booking[];
            }>
        >(ENDPOINTS.getBookings.url, {
            params: new URLSearchParams(queryKey[1]),
        });
        return response.data;
    },

    async getBooking(id: string) {
        const response = await client().get<JsonResponse<Booking>>(`${ENDPOINTS.getBookings.url}/${id}`);
        return response.data;
    },

    async createBooking(data: BookingFormValues) {
        const response = await client().post<JsonResponse<Booking>>(ENDPOINTS.createBooking.url, data);
        return response.data;
    },

    async updateBooking({ id, data }: { id: number; data: BookingFormValues }) {
        const response = await client().put<JsonResponse<Booking>>(`${ENDPOINTS.getBookings.url}/${id}`, data);
        return response.data;
    },
    async updateBookingStatus(id: number, status: BookingStatus) {
        const response = await client().patch<JsonResponse<Booking>>(`${ENDPOINTS.updateBookingStatus.url(id)}`, { status });
        return response.data;
    },
    async deleteBooking(id: number) {
        const response = await client().delete<JsonResponse<void>>(`${ENDPOINTS.getBookings.url}/${id}`);
        return response.data;
    },

    async getBookingStatistics() {
        const response = await client().get<JsonResponse<BookingStatistics>>("/api/bookings/statistics");
        return response.data;
    },
};
