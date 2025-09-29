import { PaginatedJsonResponse } from "@furever/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";

export function usePaginatedRequest<TData = Record<string, unknown>>(
  queryKey: string[],
  queryFn: (
    pageParam?: number,
    queryString?: string
  ) => Promise<AxiosResponse<PaginatedJsonResponse<TData>>>
) {
  const queryString = useSearchParams().toString();
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      return await queryFn(pageParam, queryString);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.data.pagination;
      return pagination.has_more ? pagination.next_page : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      const pagination = firstPage.data.data.pagination;
      return pagination.prev_page > 0 ? pagination.prev_page : undefined;
    },
  });
}
