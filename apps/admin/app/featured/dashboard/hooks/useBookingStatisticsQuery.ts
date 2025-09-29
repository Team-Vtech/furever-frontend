import { useQuery } from "@tanstack/react-query";
import { BookingsClient } from "../../bookings/clients/bookings.client";

export function useBookingStatisticsQuery() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["booking-statistics"],
        queryFn: BookingsClient.getBookingStatistics,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return { data, error, isLoading };
}
