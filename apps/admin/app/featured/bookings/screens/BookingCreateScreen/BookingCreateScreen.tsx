"use client";

import { BookingFormValues } from "@/app/(routes)/api/bookings/bookings.schema";
import { BookingPaymentModal } from "@/app/shared/components/BookingPaymentModal/BookingPaymentModal";
import { Provider } from "@furever/types";
import { BookingForm } from "../../containers/BookingForm";
import { useCreateBookingMutation } from "./hooks/useCreateBookingMutation";

type BookingCreateScreenProps = {
    providers: Provider[];
};

export function BookingCreateScreen({ providers }: BookingCreateScreenProps) {
    const { createBooking, isCreating, showPaymentModal, setShowPaymentModal, createdBookingId, handleCompletePayment, handleKeepAsBooking } =
        useCreateBookingMutation();

    const handleSubmit = (data: BookingFormValues) => {
        createBooking(data);
    };

    return (
        <div className="space-y-6">
            <BookingForm onSubmit={handleSubmit} isLoading={isCreating} providers={providers} />

            <BookingPaymentModal
                open={showPaymentModal}
                onOpenChange={setShowPaymentModal}
                bookingId={createdBookingId || 0}
                onCompletePayment={handleCompletePayment}
                onKeepAsBooking={handleKeepAsBooking}
                isLoading={isCreating}
            />
        </div>
    );
}
