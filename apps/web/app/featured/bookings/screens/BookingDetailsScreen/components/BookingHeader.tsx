"use client";

import { Booking } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BookingHeaderProps {
    bookingId: number;
    status: Booking["status"];
}

export function BookingHeader({ bookingId, status }: BookingHeaderProps) {
    const getStatusColor = (status: Booking["status"]) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "confirmed":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "in_progress":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "completed":
                return "bg-green-100 text-green-800 border-green-200";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className="mb-8">
            <Link href="/bookings">
                <Button variant="ghost" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Bookings
                </Button>
            </Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
                    <p className="mt-2 text-gray-600">Booking ID: #{bookingId}</p>
                </div>
                <Badge className={`px-3 py-1 text-sm font-medium ${getStatusColor(status)}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
                </Badge>
            </div>
        </div>
    );
}
