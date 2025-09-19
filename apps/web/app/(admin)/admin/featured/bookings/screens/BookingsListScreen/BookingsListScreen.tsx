"use client";

import { DataTable } from "../../../../shared/components/DataTable/DataTable";
import { useBookingsListScreenState } from "./hooks/useBookingsListScreenState";
import { bookingsColumns } from "./columns/bookings.columns";

export function BookingsListScreen() {
  const { data, pagination, isLoading, isError } = useBookingsListScreenState();

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading bookings
          </h2>
          <p className="text-sm text-muted-foreground">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
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
      />
    </div>
  );
}
