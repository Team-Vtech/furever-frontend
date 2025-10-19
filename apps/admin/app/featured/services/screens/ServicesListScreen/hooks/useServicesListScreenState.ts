import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ServicesClient } from "../../../clients/services.client";

export function useServicesListScreenState() {
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const override = new URLSearchParams(searchParams.toString());
    override.set("load", "addons,provider");
    const queryStringWithAddons = override.toString();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["list-services", queryStringWithAddons],
        queryFn: ServicesClient.getServices,
    });

    return {
        data: data?.data?.data || [],
        pagination: data?.data?.pagination,
        isLoading,
        isError,
    };
}
