"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PetType } from "../../../types";
import { Button } from "@furever/ui/components/button";
import { Badge } from "@furever/ui/components/badge";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function PetActionsCell({ petType }: { petType: PetType }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/admin/pet-types/${petType.id}/edit`);
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

export const petTypeColumns: ColumnDef<PetType>[] = [
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
            alt="Pet Type"
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
    header: "Pet Type Name",
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
    cell: ({ row }) => {
      const petType = row.original;
      return <PetActionsCell petType={petType} />;
    },
  },
];
