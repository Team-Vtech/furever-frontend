"use client";

import { Booking } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Calendar, CreditCard, Phone, Star } from "lucide-react";
import Link from "next/link";
import { RescheduleBookingModal } from "./RescheduleBookingModal";

interface BookingActionsCardProps {
    booking: Booking;
    status: Booking["status"];
    providerPhone: string;
    bookingDate: string;
    bookingTime: string;
    providerId: number;
    serviceDuration: number;
}

export function BookingActionsCard({
    booking,
    status,
    providerPhone,
    bookingDate,
    bookingTime,
    providerId,
    serviceDuration,
}: BookingActionsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {status === "pending" && (
                    <Link href={`/bookings/${booking.id}/checkout`}>
                        <Button className="w-full">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Complete Payment
                        </Button>
                    </Link>
                )}
                <RescheduleBookingModal
                    booking={booking}
                    currentDate={booking.booking_date}
                    currentTime={booking.booking_time}
                    serviceDuration={serviceDuration}
                >
                    <Button className="w-full" variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Reschedule
                    </Button>
                </RescheduleBookingModal>
                <Button className="w-full" variant="outline" asChild>
                    <Link href={`tel:${providerPhone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Provider
                    </Link>
                </Button>
                {status === "completed" && (
                    <Button className="w-full" variant="outline">
                        <Star className="mr-2 h-4 w-4" />
                        Leave Review
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
