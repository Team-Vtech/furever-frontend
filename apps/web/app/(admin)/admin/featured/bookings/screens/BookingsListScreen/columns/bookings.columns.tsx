"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Booking } from "../../../types";
import { Button } from "@furever/ui/components/button";
import { Badge } from "@furever/ui/components/badge";
import { Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

function BookingActionsCell({ booking }: { booking: Booking }) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/admin/bookings/${booking.id}`);
  };

  const handleEdit = () => {
    router.push(`/admin/bookings/${booking.id}/edit`);
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
    accessorKey: "id",
    header: "Booking ID",
    cell: ({ row }: { row: Row<Booking> }) => {
      const id = row.getValue("id") as number;
      return <div className="font-mono text-sm">{id}</div>;
    },
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }: { row: Row<Booking> }) => {
      const booking = row.original;
      return (
        <div>
          <div className="font-medium">{booking.user.name}</div>
          <div className="text-sm text-muted-foreground">
            {booking.user.email}
          </div>
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
          <div className="text-sm text-muted-foreground">
            {booking.pet.breed}
          </div>
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
          <div className="text-sm text-muted-foreground">
            ${Number(booking.service.price).toFixed(2)}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "scheduledDate",
    header: "Scheduled Date",
    cell: ({ row }: { row: Row<Booking> }) => {
      const scheduledDate = row.getValue("scheduledDate") as string;
      return (
        <div className="text-sm">
          {new Date(scheduledDate).toLocaleDateString()} at{" "}
          {new Date(scheduledDate).toLocaleTimeString([], {
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
    cell: ({ row }: { row: Row<Booking> }) => {
      const totalPrice = row.getValue("totalPrice") as number;
      return (
        <div className="font-medium">${Number(totalPrice).toFixed(2)}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<Booking> }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={getStatusBadgeVariant(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }: { row: Row<Booking> }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: Row<Booking> }) => {
      const booking = row.original;
      return <BookingActionsCell booking={booking} />;
    },
  },
];
