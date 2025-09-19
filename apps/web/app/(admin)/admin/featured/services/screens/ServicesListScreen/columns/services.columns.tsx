"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Service } from "../../../types";
import { Button } from "@furever/ui/components/button";
import { Badge } from "@furever/ui/components/badge";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

function ServiceActionsCell({ service }: { service: Service }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/admin/services/${service.id}/edit`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleEdit}>
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </Button>
    </div>
  );
}

export const servicesColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Service Name",
    cell: ({ row }: { row: Row<Service> }) => {
      const service = row.original;
      return <div className="font-medium">{service.name}</div>;
    },
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }: { row: Row<Service> }) => {
      const service = row.original;
      return (
        <div className="text-sm">
          {service.provider?.business_name || "No Provider"}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }: { row: Row<Service> }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-[300px] truncate" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }: { row: Row<Service> }) => {
      const price = row.getValue("price");
      return <div className="font-medium">${Number(price).toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "duration_minutes",
    header: "Duration",
    cell: ({ row }: { row: Row<Service> }) => {
      const duration = row.getValue("duration_minutes") as number;
      return <div>{duration} minutes</div>;
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }: { row: Row<Service> }) => {
      const isActive = row.getValue("is_active") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: Row<Service> }) => {
      const service = row.original;
      return <ServiceActionsCell service={service} />;
    },
  },
];
