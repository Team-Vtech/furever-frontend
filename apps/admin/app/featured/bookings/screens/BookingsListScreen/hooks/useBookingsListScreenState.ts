import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { BookingsClient } from "../../../clients/bookings.client";

export function useBookingsListScreenState() {
  const searchParams = useSearchParams().toString();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["list-bookings", searchParams],
    queryFn: BookingsClient.getBookings,
  });

  return {
    data: data?.data?.data || [],
    pagination: data?.data?.pagination,
    isLoading,
    isError,
    refetch,
  };
}
