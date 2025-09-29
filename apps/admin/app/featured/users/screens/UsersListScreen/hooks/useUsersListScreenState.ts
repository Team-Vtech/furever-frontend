import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { UsersClient } from "../../../clients/users.client";

export function useUsersListScreenState() {
    const queryString = useSearchParams().toString();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["list-users", queryString],
        queryFn: UsersClient.getUsers,
        select: (response) => ({
            users: response.data.data,
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
