"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { addonsColumns } from "./columns/AddonsColumns";
import { useAddonsListScreenState } from "./hooks/useAddonsListScreenState";

export function AddonsListScreen() {
    const { data, pagination, isLoading, isError } = useAddonsListScreenState();

    if (isError) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-red-600">Error loading addons</h2>
                    <p className="text-muted-foreground text-sm">Please try refreshing the page</p>
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
            filters={{
                config: [],
                initialData: {},
            }}
        />
    );
}
