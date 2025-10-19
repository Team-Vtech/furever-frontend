"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { ListingErrorState } from "@/app/shared/components/ListingErrorState";

import { ProvidersClient } from "@/app/featured/providers/clients/providers.client";
import { RolesClient } from "@/app/featured/roles/clients/roles.client";
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
    {
        filterKey: "role_id",
        type: "dynamicSelect",
        props: {
            label: "Role",
            placeholder: "Filter by role...",
            defaultValue: "all",
            queryKey: "roles",
            queryFn: RolesClient.getRoles,
        },
    },
    {
        filterKey: "provider_id",
        type: "dynamicSelect",
        props: {
            label: "Provider",
            placeholder: "Filter by provider...",
            defaultValue: "all",
            queryKey: "providers",
            optionDisplayKey: "business_name",
            queryFn: ProvidersClient.getProviders,
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
