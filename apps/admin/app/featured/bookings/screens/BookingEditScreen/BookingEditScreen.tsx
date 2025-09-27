"use client";


import { BookingFormValues } from "@/app/(routes)/api/bookings/bookings.schema";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Booking, Provider } from "@furever/types";
import { BookingForm } from "../../containers/BookingForm";
import { useDeleteBookingMutation } from "./hooks/useDeleteBookingMutation";
import { useUpdateBookingMutation } from "./hooks/useUpdateBookingMutation";

interface BookingEditScreenProps {
  booking: Booking;
  providers: Provider[];
}

export function BookingEditScreen({
  booking,
  providers,
}: BookingEditScreenProps) {

  const { isUpdating, updateBooking } = useUpdateBookingMutation();
  const { deleteBooking, isDeleting } = useDeleteBookingMutation();

  const handleSubmit = (data: BookingFormValues) => {
    updateBooking({ id: booking.id, data });
  };

  const handleDelete = () => {
    deleteBooking(booking.id);
  };

  return (
    <PageLayout
      title={`Update booking for ${booking.user.name}`}
      actions={
        <DeleteRecordDialog
          recordId={booking.id}
          recordName={`Booking ${booking.id}`}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      }
      breadcrumbs={[
        { label: "Bookings", href: "/bookings" },
        {
          label: `Booking ${booking.id}`,
          href: `/bookings/${booking.id}`,
        },
        { label: "Edit", href: "#" },
      ]}
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <BookingForm
          booking={booking}
          onSubmit={handleSubmit}
          isLoading={isUpdating}
          providers={providers}
        />
      </div>
    </PageLayout>
  );
}
