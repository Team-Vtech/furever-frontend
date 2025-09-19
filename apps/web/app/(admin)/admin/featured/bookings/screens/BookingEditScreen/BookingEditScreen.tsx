"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} from "../../hooks/useBookingQueries";
import { PageLayout } from "@/app/(admin)/admin/shared/components/PageLayout/PageLayout";
import { DeleteRecordDialog } from "@/app/(admin)/admin/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { BookingFormValues } from "@/app/(admin)/admin/(routes)/api/bookings/bookings.schema";
import { BookingForm } from "../../containers/BookingForm";

interface BookingEditScreenProps {
  bookingId: string;
}

export function BookingEditScreen({ bookingId }: BookingEditScreenProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: bookingData, isLoading, isError } = useBookingQuery(bookingId);
  const updateBookingMutation = useUpdateBookingMutation();
  const deleteBookingMutation = useDeleteBookingMutation();

  const handleSubmit = (data: BookingFormValues) => {
    updateBookingMutation.mutate(
      { id: bookingId, data },
      {
        onSuccess: () => {
          router.push("/admin/bookings");
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/admin/bookings");
  };

  const handleDelete = () => {
    deleteBookingMutation.mutate(Number(bookingId), {
      onSuccess: () => {
        router.push("/admin/bookings");
      },
    });
    setShowDeleteDialog(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">
            Loading booking...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !bookingData?.data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading booking
          </h2>
          <p className="text-sm text-muted-foreground">
            Please try refreshing the page or go back to the bookings list
          </p>
        </div>
      </div>
    );
  }

  const booking = bookingData.data;

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
        { label: "Bookings", href: "/admin/bookings" },
        {
          label: `Booking ${booking.id}`,
          href: `/admin/bookings/${booking.id}`,
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
        />
      </div>
    </PageLayout>
  );
}
