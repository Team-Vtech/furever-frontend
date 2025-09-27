"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { serviceTypeColumns } from "./columns/service-type.columns";
import { useServiceTypesListScreenState } from "./hooks/useServiceTypesListScreenState";

export function ServiceTypesListScreen() {
  const { data, pagination, isLoading, isError } =
    useServiceTypesListScreenState();

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading service types
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
      columns={serviceTypeColumns}
      data={data}
      pagination={pagination}
      isLoading={isLoading}
      searchPlaceholder="Search services..."
      showToolbar={true}
      showSearch={true}
      showColumnVisibility={true}
      filters={[]}
    />
  );
}
