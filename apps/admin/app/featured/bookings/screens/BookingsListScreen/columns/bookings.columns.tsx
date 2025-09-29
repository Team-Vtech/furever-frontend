"use client";

import { Booking } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

function BookingActionsCell({ booking }: { booking: Booking }) {
    const router = useRouter();

    const handleView = () => {
        router.push(`/bookings/${booking.id}`);
    };

    const handleEdit = () => {
        router.push(`/bookings/${booking.id}/edit`);
    };

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleView}>
                <Eye className="mr-2 h-4 w-4" />
                View
            </Button>
            <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
            </Button>
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
        cell: ({ row }: { row: Row<Booking> }) => {
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
        cell: ({ row }: { row: Row<Booking> }) => {
            const booking = row.original;
            return (
                <div>
                    <div className="font-medium">{booking.pet.name}</div>
                    <div className="text-muted-foreground text-sm">{booking.pet.breed}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "service",
        header: "Service",
        cell: ({ row }: { row: Row<Booking> }) => {
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
