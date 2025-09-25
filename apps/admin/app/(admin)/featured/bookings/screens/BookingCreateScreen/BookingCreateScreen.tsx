"use client";

import { useRouter } from "next/navigation";
import { useCreateBookingMutation } from "../../hooks/useBookingQueries";
import { BookingForm } from "../../containers/BookingForm";
import { BookingFormValues } from "@/app/(admin)/(routes)/api/bookings/bookings.schema";
import { Provider } from "@furever/types";

type BookingCreateScreenProps = {
  providers: Provider[];
};

export function BookingCreateScreen({ providers }: BookingCreateScreenProps) {
  const router = useRouter();
  const createBookingMutation = useCreateBookingMutation();

  const handleSubmit = (data: BookingFormValues) => {
    createBookingMutation.mutate(data, {
      onSuccess: () => {
        router.push("/bookings");
      },
    });
  };

  const handleCancel = () => {
    router.push("/bookings");
  };

  return (
    <div className="space-y-6">
      <BookingForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createBookingMutation.isPending}
        providers={providers}
      />
    </div>
  );
}
