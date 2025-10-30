"use client";

import { GeneralStatusBadge } from "@/app/shared/components/StatusBadge/GeneralStatusBadge";
import { Service } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@furever/ui/components/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";

function ServiceActionsCell({ service }: { service: Service }) {
    return (
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/services/${service.id}/edit`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Service</TooltipContent>
            </Tooltip>
        </div>
    );
}

export const servicesColumns: ColumnDef<Service>[] = [
    {
        accessorKey: "name",
        header: "Service Name",
        cell: ({ row }) => {
            const service = row.original;
            return <div className="font-medium">{service.name}</div>;
        },
    },
    {
        accessorKey: "provider",
        header: "Provider",
        cell: ({ row }) => {
            const service = row.original;
            return <div className="text-sm">{service.provider?.business_name || "No Provider"}</div>;
        },
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
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = row.getValue("price");
            return <div className="font-medium">₹{Number(price).toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "duration_minutes",
        header: "Duration",
        cell: ({ row }) => {
            const duration = row.getValue("duration_minutes") as number;
            return <div>{duration} minutes</div>;
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
            const service = row.original;
            return <ServiceActionsCell service={service} />;
        },
    },
];
