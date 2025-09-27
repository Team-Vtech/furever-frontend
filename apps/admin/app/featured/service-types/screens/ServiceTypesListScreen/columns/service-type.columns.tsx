"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@furever/ui/components/button";
import { Badge } from "@furever/ui/components/badge";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ServiceType } from "@furever/types";

function ServiceTypeActionsCell({ service }: { service: ServiceType }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/service-types/${service.id}/edit`);
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

export const serviceTypeColumns: ColumnDef<ServiceType>[] = [
  {
    accessorKey: "media_object",
    header: "Image",
    cell: ({ row }) => {
      return row.original.media_object ? (
        <div className="relative h-10 w-10">
          <Image
            src={
              process.env.NEXT_PUBLIC_IMAGE_URL +
              row.original.media_object.file_path
            }
            fill
            className="object-cover h-10 w-10 rounded"
            alt="Service Type"
          />
        </div>
      ) : (
        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-sm text-muted-foreground">
          N/A
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Service Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-[300px] truncate" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.original.status === "active" ? "default" : "secondary"}
        >
          {row.original.status === "active" ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const service = row.original;
      return <ServiceTypeActionsCell service={service} />;
    },
  },
];
