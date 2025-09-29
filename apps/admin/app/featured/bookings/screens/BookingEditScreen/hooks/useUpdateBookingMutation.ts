import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import { BookingsClient } from "../../../clients/bookings.client";

export function useUpdateBookingMutation() {
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["update-booking"],
        mutationFn: BookingsClient.updateBooking,
        onSuccess: () => {
            toastUtils.success.update("Booking");
        },
        onError: () => {
            toastUtils.error.update("Booking");
        },
    });

    return {
        updateBooking: mutateAsync,
        isUpdating: isPending,
    };
}
