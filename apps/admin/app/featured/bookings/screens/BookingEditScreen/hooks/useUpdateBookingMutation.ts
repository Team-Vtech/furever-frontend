import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingsClient } from "../../../clients/bookings.client";
import { useRouter } from "next/navigation";

export function useUpdateBookingMutation() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["update-booking"],
        mutationFn: BookingsClient.updateBooking,
        onSuccess: () => {
            toastUtils.success.update("Booking");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            router.push("/bookings");

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
