import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PermissionsClient } from "../../../clients/permissions.client";

export function usePermissionsListScreenState() {
  const queryString = useSearchParams().toString();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list-permissions", queryString],
    queryFn: PermissionsClient.getPermissions,
    select: (response) => ({
      permissions: response.data.data,
      pagination: response.data.pagination,
    }),
  });

  return {
    data,
    isLoading,
    isError,
  };
}
