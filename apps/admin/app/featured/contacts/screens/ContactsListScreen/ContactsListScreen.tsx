"use client";

import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { FilterConfig } from "@/app/shared/components/FiltersFactory/FiltersFactory";
import { ListingErrorState } from "@/app/shared/components/ListingErrorState/ListingErrorState";
import { contactsColumns } from "./columns/ContactsColumns";
import { useContactsListScreenState } from "./hooks/useContactsListScreenState";

const contactsFilters: FilterConfig[] = [
    {
        filterKey: "status",
        type: "select",
        props: {
            label: "Status",
            placeholder: "Filter by status...",
            options: [
                { label: "All", value: "all" },
                { label: "Read", value: "read" },
                { label: "Unread", value: "unread" },
            ],
        },
    },
];

export function ContactsListScreen() {
    const { data, isLoading, isError, refetch } = useContactsListScreenState();

    if (isError) {
        return <ListingErrorState resourceName="contacts" onRetry={refetch} />;
    }
    console.log(data);
    return (
        <DataTable
            columns={contactsColumns}
            data={data?.contacts || []}
            pagination={data?.pagination}
            isLoading={isLoading}
            showSearch
            searchPlaceholder="Search contacts..."
            showToolbar={true}
            filters={{
                config: contactsFilters,
                initialData: {
                    status: "all",
                },
            }}
        />
    );
}
