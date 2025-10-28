"use client";

import { PetTypesClient } from "@/app/featured/pet-types/clients/pet-types.client";
import { ProvidersClient } from "@/app/featured/providers/clients/providers.client";
import { ServiceTypesClient } from "@/app/featured/service-types/clients/service-types.client";
import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { servicesColumns } from "./columns/ServicesColumns";
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
                config: [
                    {
                        filterKey: "status",
                        type: "select",
                        props: {
                            label: "Status",
                            placeholder: "Filter by status...",
                            options: [
                                {
                                    label: "All",
                                    value: "all",
                                },
                                {
                                    label: "Active",
                                    value: "active",
                                },
                                {
                                    label: "Disabled",
                                    value: "disabled",
                                },
                            ],
                        },
                    },
                    {
                        filterKey: "provider_id",
                        type: "dynamicSelect",
                        props: {
                            label: "Provider",
                            placeholder: "Filter by provider...",
                            queryKey: "providers",
                            queryFn: ProvidersClient.getProviders,
                            optionDisplayKey: "business_name",
                        },
                    },
                    {
                        filterKey: "service_type_id",
                        type: "dynamicSelect",
                        props: {
                            label: "Service Type",
                            placeholder: "Filter by service type...",
                            queryKey: "serviceTypes",
                            queryFn: ServiceTypesClient.getServiceTypes,
                            optionDisplayKey: "name",
                        },
                    },
                    {
                        filterKey: "pet_type_id",
                        type: "dynamicSelect",
                        props: {
                            label: "Pet Type",
                            placeholder: "Filter by pet type...",
                            queryKey: "petTypes",
                            queryFn: PetTypesClient.getPetTypes,
                            optionDisplayKey: "name",
                        },
                    },
                ],
                initialData: {
                    status: "all",
                    provider_id: "all",
                    service_type_id: "all",
                    pet_type_id: "all",
                },
            }}
        />
    );
}
