import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ServicesClient } from "../../../clients/services.client";

export function useServicesListScreenState() {
    const queryString = useSearchParams().toString();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["list-services", queryString],
        queryFn: ServicesClient.getServices,
    });

    return {
        data: data?.data?.data || [],
        pagination: data?.data?.pagination,
        isLoading,
        isError,
    };
}
