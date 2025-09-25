"use client";

import { Button } from "@furever/ui/components/button";
import { addonsColumns } from "./columns/addons.columns";
import { useAddonsListScreenState } from "./hooks/useAddonsListScreenState";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/app/shared/components/DataTable/DataTable";

export function AddonsListScreen() {
  const router = useRouter();
  const { data, pagination, isLoading, isError } = useAddonsListScreenState();

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading addons
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
      columns={addonsColumns}
      data={data}
      pagination={pagination}
      isLoading={isLoading}
      searchPlaceholder="Search addons..."
      showToolbar={true}
      filters={[]}
    />
  );
}
