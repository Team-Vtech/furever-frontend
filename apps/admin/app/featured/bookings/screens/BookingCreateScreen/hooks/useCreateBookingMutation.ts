import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BookingsClient } from "../../../clients/bookings.client";

export function useCreateBookingMutation() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-booking"],
        mutationFn: BookingsClient.createBooking,
        onSuccess: () => {
            toastUtils.success.create("Booking");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            router.push("/bookings");
        },
        onError: () => {
            toastUtils.error.create("Booking");
        },
    });

    return {
        createBooking: mutateAsync,
        isCreating: isPending,
    };
}
