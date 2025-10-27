"use client";

import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { User } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Skeleton } from "@furever/ui/components/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@furever/ui/components/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

function UserActionsCell({ user }: { user: User }) {
    const { data: session, status } = useSession();
    if (status === "loading" || status === "unauthenticated") {
        return <Skeleton className="h-10 w-10" />;
    }
    return (
        <Authorize permissions={["edit any users", "edit own users"]} condition={user.id === session?.user?.id}>
            <div className="flex items-center gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/users/${user.id}/edit`}>
                                <Edit className="h-4 w-4" />
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit User</TooltipContent>
                </Tooltip>
            </div>
        </Authorize>
    );
}

export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            return <div className="font-medium">{user.name}</div>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            return (
                <div className="max-w-[250px] truncate" title={email}>
                    {email}
                </div>
            );
        },
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => {
            const phone = row.getValue("phone") as string;
            return <div className="text-sm">{phone}</div>;
        },
    },
    {
        accessorKey: "roles_details",
        header: "Roles",
        cell: ({ row }) => {
            const roles = row.getValue("roles_details") as { id: number; name: string }[];
            return (
                <div className="flex flex-wrap gap-1">
                    {roles.map((role) => (
                        <Badge key={role.id} variant="outline" className="text-xs">
                            {role.name}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return <Badge variant={status === "active" ? "success" : "danger"}>{status === "active" ? "Active" : "Inactive"}</Badge>;
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
            const user = row.original;
            return <UserActionsCell user={user} />;
        },
    },
];
