import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ProvidersClient } from "../../../clients/providers.client";

export function useProvidersListScreenState() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const per_page = Number(searchParams.get("per_page")) || 10;
  const search = searchParams.get("search") || undefined;
  const status = searchParams.get("status") || undefined;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list-providers", { page, per_page, search, status }],
    queryFn: () =>
      ProvidersClient.getProviders({ page, per_page, search, status }),
  });

  return {
    data: data?.data?.data || [],
    pagination: data?.data?.pagination,
    isLoading,
    isError,
  };
}
