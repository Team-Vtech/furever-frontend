import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { BookingsClient } from "../clients/bookings.client";

export type BookingStatus = "upcoming" | "past" | "cancelled";

export interface UseBookingsListOptions {
    status?: BookingStatus;
    enabled?: boolean;
}

export function useBookingsList(options: UseBookingsListOptions = {}) {
    const searchParams = useSearchParams().toString();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["listBookings", searchParams],
        queryFn: BookingsClient.getBookings,
        select: (data) => {
            return {
                bookings: data.data.bookings,
                pagination: data.data.pagination,
            };
        },
        enabled: options.enabled !== false,
    });

    return {
        data,
        isLoading,
        isError,
    };
}

// Hook for getting current active tab from URL
export function useBookingsTab() {
    const searchParams = useSearchParams();
    const status = (searchParams.get("status") as BookingStatus) || "upcoming";

    return {
        activeTab: status,
        isUpcoming: status === "upcoming",
        isPast: status === "past",
        isCancelled: status === "cancelled",
    };
}
