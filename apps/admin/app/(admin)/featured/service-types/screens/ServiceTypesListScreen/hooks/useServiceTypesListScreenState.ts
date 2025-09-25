import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ServiceTypesClient } from "../../../clients/service-types.client";

export function useServiceTypesListScreenState() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const per_page = Number(searchParams.get("per_page")) || 10;
  const search = searchParams.get("search") || undefined;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list-service-types", { page, per_page, search }],
    queryFn: () => ServiceTypesClient.getServiceTypes(),
  });

  return {
    data: data?.data?.data || [],
    pagination: data?.data?.pagination,
    isLoading,
    isError,
  };
}
