"use client";

import { PetType } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

function PetActionsCell({ petType }: { petType: PetType }) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/pet-types/${petType.id}/edit`);
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
            return <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Inactive"}</Badge>;
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
