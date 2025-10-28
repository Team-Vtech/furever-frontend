"use client";

import { Role } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@furever/ui/components/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";

function RoleActionsCell({ role }: { role: Role }) {
    return (
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/roles/${role.id}/edit`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Role</TooltipContent>
            </Tooltip>
        </div>
    );
}

export const rolesColumns: ColumnDef<Role>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue("id") as number;
            return <div className="font-medium">{id}</div>;
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name = row.getValue("name") as string;
            return <div className="font-medium">{name}</div>;
        },
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = row.getValue("created_at") as string;
            return <div className="text-muted-foreground text-sm">{new Date(createdAt).toLocaleDateString()}</div>;
        },
    },
    {
        accessorKey: "updated_at",
        header: "Last Updated",
        cell: ({ row }) => {
            const updatedAt = row.getValue("updated_at") as string;
            return <div className="text-muted-foreground text-sm">{new Date(updatedAt).toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const role = row.original;
            return <RoleActionsCell role={role} />;
        },
    },
];
