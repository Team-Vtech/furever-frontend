"use client";

import { Contact } from "@furever/types/index";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Skeleton } from "@furever/ui/components/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@furever/ui/components/tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, Eye, Mail, MailOpen, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ContactsClient } from "../../../clients/contacts.client";

function ContactActionsCell({ contact }: { contact: Contact }) {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const handleMarkAsRead = async () => {
        setIsLoading(true);
        try {
            await ContactsClient.markAsRead(contact.id.toString());
            toast.success("Contact marked as read");
            queryClient.invalidateQueries({ queryKey: ["list-contacts"] });
        } catch (error) {
            toast.error("Failed to mark as read");
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsUnread = async () => {
        setIsLoading(true);
        try {
            await ContactsClient.markAsUnread(contact.id.toString());
            toast.success("Contact marked as unread");
            queryClient.invalidateQueries({ queryKey: ["list-contacts"] });
        } catch (error) {
            toast.error("Failed to mark as unread");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Skeleton className="h-8 w-8" />;
    }

    return (
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/contacts/${contact.id}`}>
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${contact.email}`}>
                            <Mail className="h-4 w-4" />
                        </a>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Send Email</TooltipContent>
            </Tooltip>

            {contact.status === "unread" ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" onClick={handleMarkAsRead} disabled={isLoading}>
                            <MailOpen className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Mark as Read</TooltipContent>
                </Tooltip>
            ) : (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" onClick={handleMarkAsUnread} disabled={isLoading}>
                            <Eye className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Mark as Unread</TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}

export const contactsColumns: ColumnDef<Contact>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const contact = row.original;
            return (
                <div className="font-medium">
                    {contact.name}
                    {contact.status === "unread" && <div className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500" />}
                </div>
            );
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
            return phone ? (
                <div className="flex items-center gap-1 text-sm">
                    <Phone className="h-3 w-3" />
                    {phone}
                </div>
            ) : (
                <span className="text-muted-foreground text-sm">-</span>
            );
        },
    },
    {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => {
            const subject = row.getValue("subject") as string;
            return (
                <div className="max-w-[200px] truncate" title={subject}>
                    {subject}
                </div>
            );
        },
    },
    {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => {
            const message = row.getValue("message") as string;
            return (
                <div className="max-w-[300px] truncate" title={message}>
                    {message}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return <Badge variant={status === "read" ? "success" : "warning"}>{status === "read" ? "Read" : "Unread"}</Badge>;
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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const contact = row.original;
            return <ContactActionsCell contact={contact} />;
        },
    },
];
