import { useMutation } from "@tanstack/react-query";
import { BookingsClient } from "../../../clients/bookings.client";
import { toastUtils } from "@/app/shared/utils/toast.utils";

export function useDeleteBookingMutation() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["delete-booking"],
    mutationFn: BookingsClient.deleteBooking,
    onSuccess: () => {
      toastUtils.success.delete("Booking");
    },
    onError: () => {
      toastUtils.error.delete("Booking");
    },
  });

  return {
    deleteBooking: mutateAsync,
    isDeleting: isPending,
  };
}
