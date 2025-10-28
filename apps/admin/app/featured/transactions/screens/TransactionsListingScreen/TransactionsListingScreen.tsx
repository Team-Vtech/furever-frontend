"use client";

import { UsersClient } from "@/app/featured/users/clients/users.client";
import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { ListingErrorState } from "@/app/shared/components/ListingErrorState/ListingErrorState";
import { useTransactionsListScreenState } from "../../hooks/useTransactionsListScreenState";
import { transactionsColumns } from "./columns/TransactionsColumns";

export function TransactionsListingScreen() {
    const { data, pagination, isLoading, isError, refetch } = useTransactionsListScreenState();

    if (isError) {
        return <ListingErrorState resourceName="transactions" onRetry={refetch} />;
    }

    return (
        <div className="space-y-6">
            <DataTable
                columns={transactionsColumns}
                data={data}
                pagination={pagination}
                isLoading={isLoading}
                searchPlaceholder="Search transactions..."
                showToolbar={true}
                filters={{
                    config: [
                        {
                            filterKey: "status",
                            type: "select",
                            props: {
                                label: "Status",
                                placeholder: "Filter by status...",
                                options: [
                                    { label: "All", value: "all" },
                                    { label: "Pending", value: "pending" },
                                    { label: "Completed", value: "completed" },
                                    { label: "Failed", value: "failed" },
                                    { label: "Refunded", value: "refunded" },
                                ],
                            },
                        },
                        {
                            filterKey: "user_id",
                            type: "dynamicSelect",
                            props: {
                                label: "Customer",
                                placeholder: "Filter by customer...",
                                queryKey: "users",
                                queryFn: UsersClient.getUsers,
                                optionDisplayKey: "name",
                            },
                        },
                        {
                            filterKey: "payment_method",
                            type: "select",
                            props: {
                                label: "Payment Method",
                                placeholder: "Filter by payment method...",
                                options: [
                                    { label: "All", value: "all" },
                                    { label: "Credit Card", value: "credit_card" },
                                    { label: "Debit Card", value: "debit_card" },
                                    { label: "PayPal", value: "paypal" },
                                    { label: "Bank Transfer", value: "bank_transfer" },
                                ],
                            },
                        },
                        {
                            filterKey: "date_from",
                            type: "date",
                            props: {
                                label: "Date From",
                                placeholder: "Filter by date...",
                                dateFormat: "yyyy-MM-dd",
                            },
                        },
                        {
                            filterKey: "date_to",
                            type: "date",
                            props: {
                                label: "Date To",
                                placeholder: "Filter by date...",
                                dateFormat: "yyyy-MM-dd",
                            },
                        },
                    ],
                    initialData: {
                        status: "all",
                        user_id: "",
                        payment_method: "all",
                        date_from: "",
                        date_to: "",
                    },
                }}
            />
        </div>
    );
}
