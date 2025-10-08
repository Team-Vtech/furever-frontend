import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ExploreClients } from "../clients/explore.clients";

export function useExploreFilter() {
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const {
        data: filters,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["explore-filters", queryString],
        queryFn: ExploreClients.getFilters,
        select: (data) => data.data.data,
    });

    return {
        filters,
        isLoading,
        isError,
    };
}
