"use client";

import { ProviderStatusBadge } from "@/app/shared/components/StatusBadge/ProviderStatusBadge";
import { Provider } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@furever/ui/components/tooltip";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit, Eye } from "lucide-react";
import Link from "next/link";

function ProviderActionsCell({ provider }: { provider: Provider }) {
    return (
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" asChild>
                        <Link href={`/providers/${provider.id}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>View Provider</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" asChild>
                        <Link href={`/providers/${provider.id}/edit`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Provider</TooltipContent>
            </Tooltip>
        </div>
    );
}

export const providersColumns: ColumnDef<Provider>[] = [
    {
        accessorKey: "business_name",
        header: "Business Name",
        cell: ({ row }: { row: Row<Provider> }) => {
            const provider = row.original;
            return <div className="font-medium">{provider.business_name}</div>;
        },
    },
    {
        accessorKey: "contact_person_name",
        header: "Contact Person",
        cell: ({ row }: { row: Row<Provider> }) => {
            const provider = row.original;
            return <div>{provider.contact_person_name}</div>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }: { row: Row<Provider> }) => {
            const email = row.getValue("email") as string;
            return <div className="text-muted-foreground text-sm">{email}</div>;
        },
    },
    {
        accessorKey: "phone_number",
        header: "Phone",
        cell: ({ row }: { row: Row<Provider> }) => {
            const phone = row.getValue("phone_number") as string;
            return <div className="text-sm">{phone}</div>;
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
            const provider = row.original;
            if (!provider.location || typeof provider.location !== "object") {
                return <div className="text-muted-foreground text-sm">N/A</div>;
            }
            return (
                <div className="max-w-[200px] truncate" title={`${provider.location.address}, ${provider.location.city}, ${provider.location.state}`}>
                    {provider.location.city}, {provider.location.state}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return <ProviderStatusBadge status={row.original.status} />;
        },
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }: { row: Row<Provider> }) => {
            const createdAt = row.getValue("created_at") as string;
            return <div className="text-muted-foreground text-sm">{new Date(createdAt).toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: Row<Provider> }) => {
            const provider = row.original;
            return <ProviderActionsCell provider={provider} />;
        },
    },
];
