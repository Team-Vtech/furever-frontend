"use client";

import { ProvidersClient } from "@/app/featured/providers/clients/providers.client";
import { ServicesClient } from "@/app/featured/services/clients/services.client";
import { UsersClient } from "@/app/featured/users/clients/users.client";
import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { ListingErrorState } from "@/app/shared/components/ListingErrorState/ListingErrorState";
import { bookingsColumns } from "./columns/BookingsColumns";
import { useBookingsListScreenState } from "./hooks/useBookingsListScreenState";

export function BookingsListingScreen() {
    const { data, pagination, isLoading, isError, refetch } = useBookingsListScreenState();

    if (isError) {
        return <ListingErrorState resourceName="bookings" onRetry={refetch} />;
    }

    return (
        <div className="space-y-6">
            <DataTable
                columns={bookingsColumns}
                data={data}
                pagination={pagination}
                isLoading={isLoading}
                searchPlaceholder="Search bookings..."
                showToolbar={true}
                filters={{
                    config: [
                        {
                            filterKey: "status",
                            type: "select",
                            props: {
                                label: "Status",
                                placeholder: "Filter by status...",
                                options: [
                                    { label: "All", value: "all" },
                                    { label: "Pending", value: "pending" },
                                    { label: "Confirmed", value: "confirmed" },
                                    { label: "In Progress", value: "in_progress" },
                                    { label: "Completed", value: "completed" },
                                    { label: "Cancelled", value: "cancelled" },
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
                            filterKey: "user_id",
                            type: "dynamicSelect",
                            props: {
                                label: "User",
                                placeholder: "Filter by user...",
                                queryKey: "users",
                                queryFn: UsersClient.getUsers,
                                optionDisplayKey: "name",
                            },
                        },
                        {
                            filterKey: "service_id",
                            type: "dynamicSelect",
                            props: {
                                label: "Service",
                                placeholder: "Filter by service...",
                                queryKey: "services",
                                queryFn: ServicesClient.getServices,
                                optionDisplayKey: "name",
                            },
                        },
                        {
                            filterKey: "date_from",
                            type: "date",
                            props: {
                                label: "Booking Date From",
                                placeholder: "Filter by booking date...",
                                dateFormat: "yyyy-MM-dd",
                            },
                        },
                        {
                            filterKey: "date_to",
                            type: "date",
                            props: {
                                label: "Booking Date To",
                                placeholder: "Filter by booking date...",
                                dateFormat: "yyyy-MM-dd",
                            },
                        },
                    ],
                    initialData: {
                        status: "all",
                        provider_id: "",
                        user_id: "",
                        service_id: "",
                        date_from: "",
                        date_to: "",
                    },
                }}
            />
        </div>
    );
}
