import { RescheduleBookingRequest } from "@/app/(routes)/api/bookings/reschedule.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookingsClient } from "../clients/bookings.client";
import { BOOKING_QUERY_KEYS } from "../constants";

export function useCreateBookingMutation() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: BookingsClient.createBooking,
        onSuccess: (data) => {
            // Invalidate and refetch bookings list
            queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEYS.bookings });
            toast.success("Booking created successfully!");
            router.push(`/bookings/${data.data.id}#payment`);
        },
        onError: (error: any) => {
            console.error("Failed to create booking:", error);
            toast.error(error.response?.data?.message || "Failed to create booking. Please try again.");
        },
    });

    return {
        ...mutation,
    };
}

export function useCheckoutSuccessMutation() {
    const queryClient = useQueryClient();
    const {
        mutateAsync: checkoutSuccess,
        isPending,
        isError,
    } = useMutation({
        mutationKey: BOOKING_QUERY_KEYS.bookings,
        mutationFn: BookingsClient.processCheckoutSuccess,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEYS.bookings });
            queryClient.invalidateQueries({ queryKey: [`booking-${variables.bookingId}`] });
            toast.success("Payment processed successfully!");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to process payment. Please contact support.");
        },
    });
    return {
        checkoutSuccess,
        isPending,
        isError,
    };
}

export function useRescheduleBookingMutation() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: RescheduleBookingRequest }) => BookingsClient.rescheduleBooking(id, data),
        onSuccess: (data, variables) => {
            // Invalidate and refetch booking details and list
            queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEYS.bookings });
            queryClient.invalidateQueries({ queryKey: [`booking-${variables.id}`] });
            toast.success("Booking rescheduled successfully!");
        },
        onError: (error: any) => {
            console.error("Failed to reschedule booking:", error);
            toast.error(error.response?.data?.message || "Failed to reschedule booking. Please try again.");
        },
    });

    return {
        mutateAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
    };
}
