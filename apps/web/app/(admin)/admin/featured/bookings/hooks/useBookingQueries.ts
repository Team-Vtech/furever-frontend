import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookingsClient } from "../clients/bookings.client";
import { Booking } from "../types";
import { toast } from "sonner";
import { BookingFormValues } from "../../../(routes)/api/bookings/bookings.schema";

export function useBookingQuery(id: string) {
  return useQuery({
    queryKey: ["bookings", id],
    queryFn: () => BookingsClient.getBooking(id),
    enabled: !!id,
  });
}

export function useBookingsQuery(params?: {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  provider_id?: number;
  service_id?: number;
  user_id?: number;
  booking_date?: string;
}) {
  return useQuery({
    queryKey: ["bookings", params],
    queryFn: () => BookingsClient.getBookings(params),
  });
}

export function useCreateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookingFormValues) => BookingsClient.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create booking");
    },
  });
}

export function useUpdateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BookingFormValues }) =>
      BookingsClient.updateBooking(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", id] });
      toast.success("Booking updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update booking");
    },
  });
}

export function useDeleteBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => BookingsClient.deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete booking");
    },
  });
}

// Helper queries for form data
export function useProvidersQuery() {
  return useQuery({
    queryKey: ["providers"],
    queryFn: () => BookingsClient.getProviders(),
  });
}

export function useServicesQuery() {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => BookingsClient.getServices(),
  });
}

export function useUsersQuery(search?: string) {
  return useQuery({
    queryKey: ["users", search],
    queryFn: () => BookingsClient.getUsers(search),
    enabled: !!search && search.length > 2, // Only search when user types more than 2 characters
  });
}

export function useUserPetsQuery(userId: number) {
  return useQuery({
    queryKey: ["users", userId, "pets"],
    queryFn: () => BookingsClient.getUserPets(userId),
    enabled: !!userId,
  });
}

export function usePetTypesQuery() {
  return useQuery({
    queryKey: ["pet-types"],
    queryFn: () => BookingsClient.getPetTypes(),
  });
}
