"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { serviceTypeColumns } from "./columns/ServiceTypeColumns";
import { useServiceTypesListScreenState } from "./hooks/useServiceTypesListScreenState";

export function ServiceTypesListScreen() {
    const { data, pagination, isLoading, isError } = useServiceTypesListScreenState();

    if (isError) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-red-600">Error loading service types</h2>
                    <p className="text-muted-foreground text-sm">Please try refreshing the page</p>
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
            filters={{
                config: [],
                initialData: {},
            }}
        />
    );
}
