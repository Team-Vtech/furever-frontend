"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { certificatesColumns } from "./columns/certificates.columns";
import { useCertificatesListScreenState } from "./hooks/useCertificatesListScreenState";

export function CertificatesListScreen() {
    const { data, pagination, isLoading, isError } = useCertificatesListScreenState();

    if (isError) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-red-600">Error loading certificates</h2>
                    <p className="text-muted-foreground text-sm">Please try refreshing the page</p>
                </div>
            </div>
        );
    }

    return (
        <DataTable
            columns={certificatesColumns}
            data={data}
            pagination={pagination}
            isLoading={isLoading}
            searchPlaceholder="Search certificates..."
            showToolbar={true}
            filters={{
                config: [],
                initialData: {},
            }}
        />
    );
}
