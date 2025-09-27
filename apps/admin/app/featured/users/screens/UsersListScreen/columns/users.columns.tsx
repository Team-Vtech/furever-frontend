"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { User } from "../../../types";
import { Button } from "@furever/ui/components/button";
import { Badge } from "@furever/ui/components/badge";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

function UserActionsCell({ user }: { user: User }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/users/${user.id}`);
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

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }: { row: Row<User> }) => {
      const user = row.original;
      return <div className="font-medium">{user.name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }: { row: Row<User> }) => {
      const email = row.getValue("email") as string;
      return (
        <div className="max-w-[250px] truncate" title={email}>
          {email}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }: { row: Row<User> }) => {
      const phone = row.getValue("phone") as string;
      return <div className="text-sm">{phone}</div>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }: { row: Row<User> }) => {
      const address = row.getValue("address") as string;
      return (
        <div className="max-w-[200px] truncate text-sm" title={address}>
          {address}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<User> }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status === "active" ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }: { row: Row<User> }) => {
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
    cell: ({ row }: { row: Row<User> }) => {
      const user = row.original;
      return <UserActionsCell user={user} />;
    },
  },
];
