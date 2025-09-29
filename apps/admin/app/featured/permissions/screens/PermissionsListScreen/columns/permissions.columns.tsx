"use client";

import { Permission } from "@furever/types/index";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

function PermissionActionsCell({ permission }: { permission: Permission }) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/permissions/${permission.id}`);
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

export const permissionsColumns: ColumnDef<Permission>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }: { row: Row<Permission> }) => {
            const id = row.getValue("id") as number;
            return <div className="font-medium">{id}</div>;
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }: { row: Row<Permission> }) => {
            const name = row.getValue("name") as string;
            return <div className="font-medium">{name}</div>;
        },
    },
    {
        accessorKey: "roles",
        header: "Roles",
        cell: ({ row }: { row: Row<Permission> }) => {
            const permission = row.original;
            const roles = permission.roles || [];

            if (roles.length === 0) {
                return <div className="text-muted-foreground text-sm">No roles assigned</div>;
            }

            return (
                <div className="flex flex-wrap gap-1">
                    {roles.slice(0, 3).map((role) => (
                        <Badge key={role.id} variant="secondary" className="text-xs">
                            {role.name}
                        </Badge>
                    ))}
                    {roles.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                            +{roles.length - 3} more
                        </Badge>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }: { row: Row<Permission> }) => {
            const createdAt = row.getValue("created_at") as string;
            return <div className="text-muted-foreground text-sm">{new Date(createdAt).toLocaleDateString()}</div>;
        },
    },
    {
        accessorKey: "updated_at",
        header: "Last Updated",
        cell: ({ row }: { row: Row<Permission> }) => {
            const updatedAt = row.getValue("updated_at") as string;
            return <div className="text-muted-foreground text-sm">{new Date(updatedAt).toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: Row<Permission> }) => {
            const permission = row.original;
            return <PermissionActionsCell permission={permission} />;
        },
    },
];
