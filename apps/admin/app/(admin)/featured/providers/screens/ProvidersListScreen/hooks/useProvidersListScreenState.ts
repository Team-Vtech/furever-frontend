import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ProvidersClient } from "../../../clients/providers.client";

export function useProvidersListScreenState() {
  const searchParams = useSearchParams().toString();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["list-providers", searchParams],
    queryFn: ProvidersClient.getProviders,
    select: (data) => {
      return {
        providers: data.data.data,
        pagination: data.data.pagination,
      };
    },
  });

  return {
    data: data?.providers || [],
    pagination: data?.pagination,
    isLoading,
    isError,
    refetch,
  };
}
