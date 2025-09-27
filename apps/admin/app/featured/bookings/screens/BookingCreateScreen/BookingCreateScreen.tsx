"use client";

import { useRouter } from "next/navigation";
import { BookingForm } from "../../containers/BookingForm";
import { BookingFormValues } from "@/app/(routes)/api/bookings/bookings.schema";
import { Provider } from "@furever/types";
import { useCreateBookingMutation } from "./hooks/useCreateBookingMutation";

type BookingCreateScreenProps = {
  providers: Provider[];
};

export function BookingCreateScreen({ providers }: BookingCreateScreenProps) {
  const { createBooking, isCreating } = useCreateBookingMutation();

  const handleSubmit = (data: BookingFormValues) => {
    createBooking(data);
  };

  return (
    <div className="space-y-6">
      <BookingForm
        onSubmit={handleSubmit}
        isLoading={isCreating}
        providers={providers}
      />
    </div>
  );
}
