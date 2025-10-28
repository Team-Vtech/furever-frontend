"use client";

import { GeneralStatusBadge } from "@/app/shared/components/StatusBadge/GeneralStatusBadge";
import { ServiceType } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@furever/ui/components/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ServiceTypeActionsCell({ serviceType }: { serviceType: ServiceType }) {
    return (
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/service-types/${serviceType.id}/edit`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Service Type</TooltipContent>
            </Tooltip>
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
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + row.original.media_object.file_path}
                        fill
                        className="h-10 w-10 rounded object-cover"
                        alt="Service Type"
                    />
                </div>
            ) : (
                <div className="bg-muted text-muted-foreground flex h-10 w-10 items-center justify-center rounded text-sm">N/A</div>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
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
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            return <div className="text-muted-foreground text-sm">{new Date(row.original.created_at).toLocaleDateString()}</div>;
        },
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
        cell: ({ row }) => {
            return <div className="text-muted-foreground text-sm">{new Date(row.original.updated_at).toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const serviceType = row.original;
            return <ServiceTypeActionsCell serviceType={serviceType} />;
        },
    },
];
