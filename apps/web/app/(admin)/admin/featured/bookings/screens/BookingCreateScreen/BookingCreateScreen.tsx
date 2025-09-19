"use client";

import { useRouter } from "next/navigation";
import { useCreateBookingMutation } from "../../hooks/useBookingQueries";
import { BookingForm } from "../../containers/BookingForm";
import { BookingFormValues } from "@/app/(admin)/admin/(routes)/api/bookings/bookings.schema";

export function BookingCreateScreen() {
  const router = useRouter();
  const createBookingMutation = useCreateBookingMutation();

  const handleSubmit = (data: BookingFormValues) => {
    createBookingMutation.mutate(data, {
      onSuccess: () => {
        router.push("/admin/bookings");
      },
    });
  };

  const handleCancel = () => {
    router.push("/admin/bookings");
  };

  return (
    <div className="space-y-6">
      <BookingForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createBookingMutation.isPending}
      />
    </div>
  );
}
