"use client";

import { BookingStatsCard } from "./BookingStatsCard";
import { BookingChartsCard } from "./BookingChartsCard";
import { BookingStatisticsLoading } from "./BookingStatisticsLoading";
import { useBookingStatisticsQuery } from "../../bookings/hooks/useBookingQueries";

export function BookingStatisticsSection() {
  const { data: statistics, isLoading, error } = useBookingStatisticsQuery();

  if (isLoading) {
    return <BookingStatisticsLoading />;
  }

  if (error || !statistics) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <div className="text-center text-muted-foreground">
          Unable to load booking statistics
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Booking Stats Card takes 1 column */}
      <BookingStatsCard statistics={statistics.data} />

      {/* Charts Card takes 2 columns */}
      <BookingChartsCard statistics={statistics.data} />
    </div>
  );
}
