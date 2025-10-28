"use client";

import { PaymentBadge } from "@/app/shared/components/PaymentBadge/PaymentBadge";
import { Booking } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@furever/ui/components/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye } from "lucide-react";
import Link from "next/link";

function BookingActionsCell({ booking }: { booking: Booking }) {
    return (
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/bookings/${booking.id}/view`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>View Booking</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/bookings/${booking.id}/edit`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Booking</TooltipContent>
            </Tooltip>
        </div>
    );
}

function getStatusBadgeVariant(status: string) {
    switch (status) {
        case "confirmed":
            return "default";
        case "pending":
            return "secondary";
        case "completed":
            return "outline";
        case "cancelled":
            return "destructive";
        default:
            return "secondary";
    }
}

export const bookingsColumns: ColumnDef<Booking>[] = [
    {
        accessorKey: "user",
        header: "Customer",
        cell: ({ row }) => {
            const booking = row.original;
            return (
                <div>
                    <div className="font-medium">{booking.user.name}</div>
                    <div className="text-muted-foreground text-sm">{booking.user.email}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "pet",
        header: "Pet",
        cell: ({ row }) => {
            const booking = row.original;
            return (
                <div>
                    <div className="font-medium">{booking.pet.name}</div>
                    <div className="text-muted-foreground text-sm">{booking.pet.pet_breed?.name}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "service",
        header: "Service",
        cell: ({ row }) => {
            const booking = row.original;
            return (
                <div>
                    <div className="font-medium">{booking.service.name}</div>
                    <div className="text-muted-foreground text-sm">${Number(booking.service.price).toFixed(2)}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "scheduledDate",
        header: "Scheduled Date",
        cell: ({ row }) => {
            return (
                <div className="text-sm">
                    {new Date(row.original.booking_date).toLocaleDateString()} at{" "}
                    {new Date(row.original.booking_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            );
        },
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price",
        cell: ({ row }) => {
            return <div className="font-medium">${Number(row.original.total_price).toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return <Badge variant={getStatusBadgeVariant(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
        },
    },
    {
        accessorKey: "payment_status",
        header: "Payment Status",
        cell: ({ row }) => {
            const paymentStatus = row.original.payment_status;
            return <PaymentBadge status={paymentStatus} />;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = row.original.created_at;
            return <div className="text-muted-foreground text-sm">{new Date(createdAt).toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const booking = row.original;
            return <BookingActionsCell booking={booking} />;
        },
    },
];
