"use client";

import { Booking } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { cn } from "@furever/ui/lib/utils";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface UpcomingAppointmentsProps {
    upcomingBookings: Booking[];
    className?: string;
}

export function UpcomingAppointments({ upcomingBookings, className }: UpcomingAppointmentsProps) {
    const today = new Date();
    const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
    const dayNumber = today.getDate();

    return (
        <Card className={cn("", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">Upcoming Appointments</CardTitle>
                <Badge variant="outline" className="border-orange-200 bg-orange-100 text-orange-800">
                    {dayName}, {dayNumber}
                </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
                {upcomingBookings.length === 0 ? (
                    <div className="text-muted-foreground py-4 text-center">No upcoming appointments</div>
                ) : (
                    upcomingBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className={cn("border-border flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0")}
                        >
                            <div className="space-y-1">
                                <p className="font-medium">{format(booking.booking_time, "hh:mm a")}</p>
                                <p className="text-muted-foreground text-sm">
                                    {booking.user.name} ({booking.pet.name} ({booking.pet.pet_type.name}))
                                </p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="font-medium">{booking.service.name}</p>
                                <Badge
                                    variant={booking.status === "confirmed" ? "default" : "secondary"}
                                    className={cn(
                                        booking.status === "confirmed"
                                            ? "border-green-200 bg-green-100 text-green-800"
                                            : booking.status === "pending"
                                              ? "border-orange-200 bg-orange-100 text-orange-800"
                                              : booking.status === "in_progress"
                                                ? "border-blue-200 bg-blue-100 text-blue-800"
                                                : booking.status === "completed"
                                                  ? "border-gray-200 bg-gray-100 text-gray-800"
                                                  : "border-red-200 bg-red-100 text-red-800",
                                    )}
                                >
                                    {booking.status === "confirmed"
                                        ? "Confirmed"
                                        : booking.status === "pending"
                                          ? "Pending"
                                          : booking.status === "in_progress"
                                            ? "In Progress"
                                            : booking.status === "completed"
                                              ? "Completed"
                                              : "Cancelled"}
                                </Badge>
                            </div>
                        </div>
                    ))
                )}
                <Button variant="outline" className="mt-4 w-full" size="sm" asChild>
                    <Link href="/bookings">
                        View All Bookings
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
