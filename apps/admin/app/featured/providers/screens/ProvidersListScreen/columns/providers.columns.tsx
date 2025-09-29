"use client";

import { Provider } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

function ProviderActionsCell({ provider }: { provider: Provider }) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/providers/${provider.id}`);
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

function StatusBadge({ status }: { status: string }) {
    const statusConfig = {
        pending: { variant: "secondary", label: "Pending" },
        approved: { variant: "default", label: "Approved" },
        rejected: { variant: "destructive", label: "Rejected" },
        inactive: { variant: "outline", label: "Inactive" },
    } as const;

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return <Badge variant={config.variant as "default" | "secondary" | "destructive" | "outline"}>{config.label}</Badge>;
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
        cell: ({ row }: { row: Row<Provider> }) => {
            const status = row.getValue("status") as string;
            return <StatusBadge status={status} />;
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
