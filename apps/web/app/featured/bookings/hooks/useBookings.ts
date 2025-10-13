import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookingsClient } from "../clients/bookings.client";
import { BOOKING_QUERY_KEYS } from "../constants";
import { WebBookingFormValues } from "../types/booking.types";

export function useBookingsQuery() {
    return useQuery({
        queryKey: BOOKING_QUERY_KEYS.bookings,
        queryFn: BookingsClient.getBookings,
        select: (data) => data.data,
    });
}

export function useBookingQuery(id: string | number) {
    return useQuery({
        queryKey: BOOKING_QUERY_KEYS.booking(id),
        queryFn: () => BookingsClient.getBooking(id),
        select: (data) => data.data,
        enabled: !!id,
    });
}

export function useCreateBookingMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: WebBookingFormValues) => BookingsClient.createBooking(data),
        onSuccess: () => {
            // Invalidate and refetch bookings list
            queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEYS.bookings });
            toast.success("Booking created successfully!");
        },
        onError: (error: any) => {
            console.error("Failed to create booking:", error);
            toast.error(error.response?.data?.message || "Failed to create booking. Please try again.");
        },
    });
}

export function useCancelBookingMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) => BookingsClient.cancelBooking(id),
        onSuccess: (_, id) => {
            // Invalidate both the specific booking and the bookings list
            queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEYS.booking(id) });
            queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEYS.bookings });
            toast.success("Booking cancelled successfully!");
        },
        onError: (error: any) => {
            console.error("Failed to cancel booking:", error);
            toast.error(error.response?.data?.message || "Failed to cancel booking. Please try again.");
        },
    });
}
