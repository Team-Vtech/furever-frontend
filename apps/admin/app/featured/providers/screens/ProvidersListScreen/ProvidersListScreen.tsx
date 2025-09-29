"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { ListingErrorState } from "@/app/shared/components/ListingErrorState";

import { providersColumns } from "./columns/providers.columns";
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
                config: [],
                initialData: {},
            }}
        />
    );
}
