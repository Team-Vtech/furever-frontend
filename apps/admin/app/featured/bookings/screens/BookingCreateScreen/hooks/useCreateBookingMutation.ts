import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookingsClient } from "../../../clients/bookings.client";

export function useCreateBookingMutation() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [createdBookingId, setCreatedBookingId] = useState<number | null>(null);

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-booking"],
        mutationFn: BookingsClient.createBooking,
        onSuccess: (data) => {
            toastUtils.success.create("Booking");
            queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === "list-bookings" });
            setCreatedBookingId(data.data.id);
            setShowPaymentModal(true);
        },
        onError: () => toastUtils.error.create("Booking"),
    });

    const handleCompletePayment = () => {
        if (createdBookingId) {
            // Navigate to booking details with #payment hash
            router.push(`/bookings/${createdBookingId}#payment`);
        }
        setShowPaymentModal(false);
    };

    const handleKeepAsBooking = () => {
        if (createdBookingId) {
            // Navigate to booking details page
            router.push(`/bookings/${createdBookingId}`);
        }
        setShowPaymentModal(false);
    };

    return {
        createBooking: mutateAsync,
        isCreating: isPending,
        showPaymentModal,
        setShowPaymentModal,
        createdBookingId,
        handleCompletePayment,
        handleKeepAsBooking,
    };
}
