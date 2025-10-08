import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ProvidersClient } from "../clients/providers.client";

export function useProvidersQuery() {
    const searchParams = useSearchParams().toString();
    const { data, isLoading, isEnabled } = useQuery({
        queryKey: ["providers", searchParams],
        queryFn: ProvidersClient.getProviders,
        staleTime: 5 * 60 * 1000, // 5 minutes
        select: (data) => ({
            providers: data.data.data.data,
            pagination: data.data.data.pagination,
        }),
    });

    return { data, isLoading, isEnabled };
}
