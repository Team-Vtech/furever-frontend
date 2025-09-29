"use client";

import { BookingStatistics } from "@furever/types/index";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Calendar } from "lucide-react";

interface BookingStatsCardProps {
    statistics: BookingStatistics;
}

export function BookingStatsCard({ statistics }: BookingStatsCardProps) {
    const { total_bookings, bookings_by_status } = statistics;

    const statusDescription = Object.entries(bookings_by_status)
        .map(([status, count]) => `${count} ${status.replace(/_/g, " ")}`)
        .join(", ");

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{total_bookings}</div>
                <p className="text-muted-foreground mt-1 text-xs">{statusDescription}</p>
            </CardContent>
        </Card>
    );
}
