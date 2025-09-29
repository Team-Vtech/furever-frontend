"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { servicesColumns } from "./columns/services.columns";
import { useServicesListScreenState } from "./hooks/useServicesListScreenState";

export function ServicesListScreen() {
    const { data, pagination, isLoading, isError } = useServicesListScreenState();

    if (isError) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-red-600">Error loading services</h2>
                    <p className="text-muted-foreground text-sm">Please try refreshing the page</p>
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
            filters={{
                config: [],
                initialData: {},
            }}
        />
    );
}
