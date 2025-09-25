import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { RolesClient } from "../../../clients/roles.client";

export function useRolesListScreenState() {
  const queryString = useSearchParams().toString();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list-roles", queryString],
    queryFn: RolesClient.getRoles,
    select: (response) => ({
      roles: response.data.data,
      pagination: response.data.pagination,
    }),
  });

  return {
    data,
    isLoading,
    isError,
  };
}
