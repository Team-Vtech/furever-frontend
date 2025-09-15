"use client";

import { DataTable } from "../../../../shared/components/DataTable/DataTable";
import { petTypeColumns } from "./columns/pet-type.columns";
import { usePetTypesListScreenState } from "./hooks/usePetTypesListScreenState";

export function PetTypesListScreen() {
  const { data, pagination, isLoading, isError } = usePetTypesListScreenState();

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading pet types
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
      columns={petTypeColumns}
      data={data}
      pagination={pagination}
      isLoading={isLoading}
      searchPlaceholder="Search pet types..."
      showToolbar={true}
      showSearch={true}
      showColumnVisibility={true}
    />
  );
}
