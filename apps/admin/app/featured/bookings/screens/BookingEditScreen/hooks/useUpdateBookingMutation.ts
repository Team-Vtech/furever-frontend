import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BookingsClient } from "../../../clients/bookings.client";

export function useUpdateBookingMutation() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["update-booking"],
        mutationFn: BookingsClient.updateBooking,
        onSuccess: () => {
            toastUtils.success.update("Booking");
            queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === "list-bookings" });
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
