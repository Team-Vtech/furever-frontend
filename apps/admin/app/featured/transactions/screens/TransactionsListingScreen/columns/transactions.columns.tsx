"use client";

import { Transaction } from "@furever/types/index";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Download, Eye } from "lucide-react";
import Link from "next/link";

export const transactionsColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="font-medium">#{row.getValue("id")}</div>;
        },
    },
    {
        accessorKey: "paddle_id",
        header: "Paddle ID",
        cell: ({ row }) => {
            return <div className="font-mono text-sm">{row.getValue("paddle_id")}</div>;
        },
    },
    {
        accessorKey: "invoice_number",
        header: "Invoice Number",
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("invoice_number")}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const statusColors = {
                pending: "bg-yellow-100 text-yellow-800",
                completed: "bg-green-100 text-green-800",
                failed: "bg-red-100 text-red-800",
                refunded: "bg-blue-100 text-blue-800",
            };
            return (
                <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            );
        },
    },
    {
        accessorKey: "total",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const total = parseFloat(row.getValue("total"));
            const currency = row.original.currency;
            return (
                <div className="font-medium">
                    {currency} {total.toFixed(2)}
                </div>
            );
        },
    },
    {
        accessorKey: "tax",
        header: "Tax",
        cell: ({ row }) => {
            const tax = parseFloat(row.getValue("tax"));
            const currency = row.original.currency;
            return (
                <div className="text-muted-foreground text-sm">
                    {currency} {tax.toFixed(2)}
                </div>
            );
        },
    },
    {
        accessorKey: "billed_at",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Billed At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const billedAt = row.getValue("billed_at") as string;
            if (!billedAt) return <div className="text-gray-400">-</div>;
            return <div>{new Date(billedAt).toLocaleDateString()}</div>;
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const createdAt = row.getValue("created_at") as string;
            return <div className="text-muted-foreground text-sm">{new Date(createdAt).toLocaleDateString()}</div>;
        },
    },
    {
        id: "invoice_pdf",
        header: "Invoice",
        cell: ({ row }) => {
            const invoicePdf = row.original.invoicePdf;
            if (!invoicePdf) return <div className="text-gray-400">-</div>;
            return (
                <Button asChild variant="outline" size="sm">
                    <a href={invoicePdf} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                    </a>
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const transaction = row.original;
            return (
                <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/transactions/${transaction.id}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            );
        },
    },
];
