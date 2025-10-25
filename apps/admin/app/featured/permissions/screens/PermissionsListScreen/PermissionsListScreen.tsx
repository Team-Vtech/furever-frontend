"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { permissionsColumns } from "./columns/permissions.columns";
import { usePermissionsListScreenState } from "./hooks/usePermissionsListScreenState";

export function PermissionsListScreen() {
    const { data, isLoading, isError } = usePermissionsListScreenState();
    if (isError) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-red-600">Error loading permissions</h2>
                    <p className="text-muted-foreground text-sm">Please try refreshing the page</p>
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
            filters={{
                config: [],
                initialData: {},
            }}
        />
    );
}
