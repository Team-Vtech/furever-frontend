import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingsClient } from "../../../clients/bookings.client";
import { useRouter } from "next/navigation";

export function useDeleteBookingMutation() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["delete-booking"],
        mutationFn: BookingsClient.deleteBooking,
        onSuccess: () => {
            toastUtils.success.delete("Booking");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            router.push("/bookings");
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
