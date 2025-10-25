"use client";

import { GeneralStatusBadge } from "@/app/shared/components/StatusBadge/GeneralStatusBadge";
import { Addon } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@furever/ui/components/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";

function AddonActionsCell({ addon }: { addon: Addon }) {
    return (
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/addons/${addon.id}/edit`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>View Addon</TooltipContent>
            </Tooltip>
        </div>
    );
}

export const addonsColumns: ColumnDef<Addon>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return <div className="font-medium">{row.original.name || "No name"}</div>;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            return (
                <div className="max-w-[300px] truncate" title={row.original.description}>
                    {row.original.description}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return <GeneralStatusBadge status={row.original.status} />;
        },
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            return <div className="text-muted-foreground text-sm">{new Date(row.original.created_at).toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return <AddonActionsCell addon={row.original} />;
        },
    },
];
