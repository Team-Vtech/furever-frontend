"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { ListingErrorState } from "@/app/shared/components/ListingErrorState/ListingErrorState";

import { providersColumns } from "./columns/ProvidersColumns";
import { useProvidersListScreenState } from "./hooks/useProvidersListScreenState";

export function ProvidersListScreen() {
    const { data, pagination, isLoading, isError, refetch } = useProvidersListScreenState();
    if (isError) {
        return <ListingErrorState resourceName="providers" onRetry={refetch} />;
    }

    return (
        <DataTable
            columns={providersColumns}
            data={data}
            pagination={pagination}
            isLoading={isLoading}
            searchPlaceholder="Search providers..."
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
                                { label: "Approved", value: "approved" },
                                { label: "Rejected", value: "rejected" },
                            ],
                        },
                    },
                ],
                initialData: {
                    status: "all",
                },
            }}
        />
    );
}
