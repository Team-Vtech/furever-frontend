"use client";

import { DataTable } from "../../../../shared/components/DataTable/DataTable";
import { usersColumns } from "./columns/users.columns";
import { useUsersListScreenState } from "./hooks/useUsersListScreenState";

export function UsersListScreen() {
  const { data, isLoading, isError } = useUsersListScreenState();

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading users
          </h2>
          <p className="text-sm text-muted-foreground">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  return (
    <DataTable
      columns={usersColumns}
      data={data?.users || []}
      pagination={data?.pagination}
      isLoading={isLoading}
      searchPlaceholder="Search users..."
      showToolbar={true}
    />
  );
}
