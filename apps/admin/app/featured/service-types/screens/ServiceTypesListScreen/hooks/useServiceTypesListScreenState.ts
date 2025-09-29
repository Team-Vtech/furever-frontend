import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ServiceTypesClient } from "../../../clients/service-types.client";

export function useServiceTypesListScreenState() {
    const searchParams = useSearchParams().toString();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["list-service-types", searchParams],
        queryFn: ServiceTypesClient.getServiceTypes,
    });

    return {
        data: data?.data?.data || [],
        pagination: data?.data?.pagination,
        isLoading,
        isError,
    };
}
