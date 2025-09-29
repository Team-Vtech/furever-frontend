"use client";

import { Role } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

function RoleActionsCell({ role }: { role: Role }) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/roles/${role.id}`);
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

export const rolesColumns: ColumnDef<Role>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }: { row: Row<Role> }) => {
            const id = row.getValue("id") as number;
            return <div className="font-medium">{id}</div>;
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }: { row: Row<Role> }) => {
            const name = row.getValue("name") as string;
            return <div className="font-medium">{name}</div>;
        },
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }: { row: Row<Role> }) => {
            const createdAt = row.getValue("created_at") as string;
            return <div className="text-muted-foreground text-sm">{new Date(createdAt).toLocaleDateString()}</div>;
        },
    },
    {
        accessorKey: "updated_at",
        header: "Last Updated",
        cell: ({ row }: { row: Row<Role> }) => {
            const updatedAt = row.getValue("updated_at") as string;
            return <div className="text-muted-foreground text-sm">{new Date(updatedAt).toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: Row<Role> }) => {
            const role = row.original;
            return <RoleActionsCell role={role} />;
        },
    },
];
