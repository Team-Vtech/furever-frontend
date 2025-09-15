import { PaginatedJsonResponse } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

/**
 * Custom hook for handling paginated requests with infinite scrolling
 * @param queryKey - Unique query key for React Query caching
 * @param queryFn - Function that fetches data for a specific page
 * @returns useInfiniteQuery result with proper pagination handling
 */
export function usePaginatedRequest<TData = Record<string, unknown>>(
    queryKey: string[],
    queryFn: (pageParam?: number) => Promise<AxiosResponse<PaginatedJsonResponse<TData>>>,
) {
    return useInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam = 1 }) => {
            return await queryFn(pageParam);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pagination = lastPage.data.data.pagination;
            return pagination.has_more ? pagination.next_page : undefined;
        },
        getPreviousPageParam: (firstPage) => {
            const pagination = firstPage.data.data.pagination;
            return pagination.previous_page > 0 ? pagination.previous_page : undefined;
        },
    });
}
