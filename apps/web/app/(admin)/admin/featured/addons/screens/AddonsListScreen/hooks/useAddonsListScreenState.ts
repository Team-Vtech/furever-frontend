import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { AddonsClient } from "../../../clients/addons.client";

export function useAddonsListScreenState() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const per_page = Number(searchParams.get("per_page")) || 10;
  const search = searchParams.get("search") || undefined;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list-addons", { page, per_page, search }],
    queryFn: () => AddonsClient.getAddons({ page, per_page, search }),
  });

  return {
    data: data?.data?.data || [],
    pagination: data?.data?.pagination,
    isLoading,
    isError,
  };
}
