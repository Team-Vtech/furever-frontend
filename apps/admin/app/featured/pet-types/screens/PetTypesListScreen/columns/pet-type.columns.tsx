"use client";

import { GeneralStatusBadge } from "@/app/shared/components/StatusBadge/GeneralStatusBadge";
import { PetType } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@furever/ui/components/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";

function PetActionsCell({ petType }: { petType: PetType }) {
    return (
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/pet-types/${petType.id}/edit`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Pet Type</TooltipContent>
            </Tooltip>
        </div>
    );
}

export const petTypeColumns: ColumnDef<PetType>[] = [
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return <GeneralStatusBadge status={row.original.status} />;
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
