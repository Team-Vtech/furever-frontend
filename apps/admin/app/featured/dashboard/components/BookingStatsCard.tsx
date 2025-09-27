"use client";

import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@furever/ui/components/card";
import { BookingStatistics } from "../../../shared/types/models.types";

interface BookingStatsCardProps {
  statistics: BookingStatistics;
}

export function BookingStatsCard({ statistics }: BookingStatsCardProps) {
  console.log(statistics, "statistics");
  const { total_bookings, bookings_by_status } = statistics;

  const statusDescription = `${bookings_by_status.pending} pending, ${bookings_by_status.cancelled} cancelled`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total_bookings}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {statusDescription}
        </p>
      </CardContent>
    </Card>
  );
}
