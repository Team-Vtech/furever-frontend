"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { useBookingsListScreenState } from "./hooks/useBookingsListScreenState";
import { bookingsColumns } from "./columns/bookings.columns";
import { ListingErrorState } from "@/app/shared/components/ListingErrorState";

export function BookingsListScreen() {
  const { data, pagination, isLoading, isError, refetch } =
    useBookingsListScreenState();

  if (isError) {
    return <ListingErrorState resourceName="bookings" onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      <DataTable
        columns={bookingsColumns}
        data={data}
        pagination={pagination}
        isLoading={isLoading}
        searchPlaceholder="Search bookings..."
        showToolbar={true}
        filters={[]}
      />
    </div>
  );
}
