import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookingsClient } from "../clients/bookings.client";
import { BOOKING_QUERY_KEYS } from "../constants";
import { BookingFormValues } from "../types/booking.types";

export function useCreateBookingMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: BookingFormValues) => BookingsClient.createBooking(data),
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
