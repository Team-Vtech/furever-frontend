"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { ListingErrorState } from "@/app/shared/components/ListingErrorState";

import { FilterConfig } from "@/app/shared/components/FiltersFactory/FiltersFactory";
import { usersColumns } from "./columns/users.columns";
import { useUsersListScreenState } from "./hooks/useUsersListScreenState";

const usersFilters: FilterConfig[] = [
    {
        filterKey: "status",
        type: "select",
        props: {
            label: "Status",
            placeholder: "Filter by status...",
            defaultValue: "all",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
            ],
        },
    },
];

export function UsersListScreen() {
    const { data, isLoading, isError, refetch } = useUsersListScreenState();

    if (isError) {
        return <ListingErrorState resourceName="users" onRetry={refetch} />;
    }

    return (
        <DataTable
            columns={usersColumns}
            data={data?.users || []}
            pagination={data?.pagination}
            isLoading={isLoading}
            showSearch
            searchPlaceholder="Search users..."
            showToolbar={true}
            filters={{
                config: usersFilters,
                initialData: {
                    status: "all",
                },
            }}
        />
    );
}
