"use client";

import { Button } from "@furever/ui/components/button";
import { DataTable } from "../../../../shared/components/DataTable/DataTable";
import { servicesColumns } from "./columns/services.columns";
import { useServicesListScreenState } from "./hooks/useServicesListScreenState";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function ServicesListScreen() {
  const router = useRouter();
  const { data, pagination, isLoading, isError } = useServicesListScreenState();

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading services
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
      columns={servicesColumns}
      data={data}
      pagination={pagination}
      isLoading={isLoading}
      searchPlaceholder="Search services..."
      showToolbar={true}
      showSearch={true}
      showColumnVisibility={true}
    />
  );
}
