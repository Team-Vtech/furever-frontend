"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { ListingErrorState } from "@/app/shared/components/ListingErrorState";

import { usersColumns } from "./columns/users.columns";
import { useUsersListScreenState } from "./hooks/useUsersListScreenState";
import { FilterConfig } from "@/app/shared/components/DataTable/types";

const usersFilters: FilterConfig[] = [
  {
    key: "status",
    type: "select",
    label: "Status",
    placeholder: "Filter by status...",
    width: "sm",
    defaultValue: "all",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];

export function UsersListScreen() {
  const { data, isLoading, isError, refetch } = useUsersListScreenState();

  const handleFiltersChange = (filters: Record<string, any>) => {
    // Here you can add logic to refetch data with new filters
    // For now, we'll just log the filters
    console.log("Filters changed:", filters);
  };

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
      filters={usersFilters}
      onFiltersChange={handleFiltersChange}
    />
  );
}
