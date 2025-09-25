"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} from "../../hooks/useBookingQueries";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { BookingFormValues } from "@/app/(admin)/(routes)/api/bookings/bookings.schema";
import { BookingForm } from "../../containers/BookingForm";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { Booking, Provider } from "@furever/types";

interface BookingEditScreenProps {
  booking: Booking;
  providers: Provider[];
}

export function BookingEditScreen({
  booking,
  providers,
}: BookingEditScreenProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updateBookingMutation = useUpdateBookingMutation();
  const deleteBookingMutation = useDeleteBookingMutation();

  const handleSubmit = (data: BookingFormValues) => {
    updateBookingMutation.mutate(
      { id: booking.id, data },
      {
        onSuccess: () => {
          router.push("/bookings");
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/bookings");
  };

  const handleDelete = () => {
    deleteBookingMutation.mutate(booking.id, {
      onSuccess: () => {
        router.push("/bookings");
      },
    });
    setShowDeleteDialog(false);
  };

  return (
    <PageLayout
      title={`Update booking for ${booking.user.name}`}
      actions={
        <DeleteRecordDialog
          recordId={booking.id}
          recordName={`Booking ${booking.id}`}
          onDelete={handleDelete}
          isDeleting={deleteBookingMutation.isPending}
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
          onCancel={handleCancel}
          isLoading={updateBookingMutation.isPending}
          providers={providers}
        />
      </div>
    </PageLayout>
  );
}
