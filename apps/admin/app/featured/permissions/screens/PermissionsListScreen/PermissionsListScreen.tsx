"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { permissionsColumns } from "./columns/permissions.columns";
import { usePermissionsListScreenState } from "./hooks/usePermissionsListScreenState";

export function PermissionsListScreen() {
  const { data, isLoading, isError } = usePermissionsListScreenState();
  console.log(data, "data");
  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading permissions
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
      columns={permissionsColumns}
      data={data?.permissions || []}
      pagination={data?.pagination}
      isLoading={isLoading}
      searchPlaceholder="Search permissions..."
      showToolbar={true}
      filters={[]}
    />
  );
}
