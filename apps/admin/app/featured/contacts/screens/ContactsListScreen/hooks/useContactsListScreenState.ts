import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ContactsClient } from "../../../clients/contacts.client";

export function useContactsListScreenState() {
    const queryString = useSearchParams().toString();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["list-contacts", queryString],
        queryFn: ContactsClient.getContacts,
        select: (response) => ({
            contacts: response.data.data,
            pagination: response.data.pagination,
        }),
    });

    return {
        data,
        isLoading,
        isError,
        refetch,
    };
}
