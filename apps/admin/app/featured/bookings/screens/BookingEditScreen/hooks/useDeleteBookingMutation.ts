import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import { BookingsClient } from "../../../clients/bookings.client";

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
