"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "../../../../shared/components/DataTable/DataTable";
import { providersColumns } from "./columns/providers.columns";
import { useProvidersListScreenState } from "./hooks/useProvidersListScreenState";

export function ProvidersListScreen() {
  const router = useRouter();
  const { data, pagination, isLoading, isError } =
    useProvidersListScreenState();
  console.log(data, "data");
  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading providers
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
      columns={providersColumns}
      data={data}
      pagination={pagination}
      isLoading={isLoading}
      searchPlaceholder="Search providers..."
      showToolbar={true}
    />
  );
}
