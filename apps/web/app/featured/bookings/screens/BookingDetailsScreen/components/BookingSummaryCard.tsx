"use client";

import { Booking } from "@furever/types";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { format } from "date-fns";

interface BookingSummaryCardProps {
    service: Booking["service"];
    provider: Booking["provider"];
    pet: Booking["pet"];
    bookingDate: string;
    bookingTime: string;
    totalPrice: number;
}

export function BookingSummaryCard({ service, provider, pet, bookingDate, bookingTime, totalPrice }: BookingSummaryCardProps) {
    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), "EEEE, MMMM d, yyyy");
    };

    const formatTime = (timeStr: string) => {
        const [hours = "0", minutes = "0"] = timeStr.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return format(date, "h:mm a");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Service:</span>
                    <span className="text-sm font-medium text-gray-900">{service.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Provider:</span>
                    <span className="text-sm font-medium text-gray-900">{provider.business_name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pet:</span>
                    <span className="text-sm font-medium text-gray-900">{pet.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Date:</span>
                    <span className="text-sm font-medium text-gray-900">{formatDate(bookingDate)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Time:</span>
                    <span className="text-sm font-medium text-gray-900">{formatTime(bookingTime)}</span>
                </div>
                <div className="my-3 border-t border-gray-200"></div>
                <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-purple-600">${totalPrice.toFixed(2)}</span>
                </div>
            </CardContent>
        </Card>
    );
}
