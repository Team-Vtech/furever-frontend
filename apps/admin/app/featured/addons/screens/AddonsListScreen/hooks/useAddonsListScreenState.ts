import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { AddonsClient } from "../../../clients/addons.client";

export function useAddonsListScreenState() {
  const searchParams = useSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list-addons", searchParams.toString()],
    queryFn: AddonsClient.getAddons,
  });

  return {
    data: data?.data?.data || [],
    pagination: data?.data?.pagination,
    isLoading,
    isError,
  };
}
