"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Addon } from "../../../types";
import { Button } from "@furever/ui/components/button";
import { Badge } from "@furever/ui/components/badge";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

function AddonActionsCell({ addon }: { addon: Addon }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/admin/addons/${addon.id}`);
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

export const addonsColumns: ColumnDef<Addon>[] = [
  {
    accessorKey: "name",
    header: "Addon Name",
    cell: ({ row }: { row: Row<Addon> }) => {
      const addon = row.original;
      return <div className="font-medium">{addon.name}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }: { row: Row<Addon> }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-[300px] truncate" title={description}>
          {description || "No description"}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }: { row: Row<Addon> }) => {
      const price = row.getValue("price") as number;
      return (
        <div className="font-medium">
          {price > 0 ? `$${Number(price).toFixed(2)}` : "Free"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<Addon> }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "published" ? "default" : "secondary"}>
          {status === "published" ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }: { row: Row<Addon> }) => {
      const createdAt = row.getValue("created_at") as string;
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
    cell: ({ row }: { row: Row<Addon> }) => {
      const addon = row.original;
      return <AddonActionsCell addon={addon} />;
    },
  },
];
