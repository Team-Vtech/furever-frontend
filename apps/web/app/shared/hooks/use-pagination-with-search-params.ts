"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export interface UsePaginationWithSearchParamsOptions {
  defaultPage?: number;
  defaultPerPage?: number;
}

export interface UsePaginationWithSearchParamsReturn {
  currentPage: number;
  perPage: number;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setPageAndPerPage: (page: number, perPage: number) => void;
  resetToFirstPage: () => void;
}

/**
 * Hook for managing pagination state with URL search parameters in Next.js
 * 
 * @param options - Configuration options
 * @returns Object containing current pagination state and setters
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { currentPage, perPage, setPage, setPerPage } = usePaginationWithSearchParams({
 *     defaultPage: 1,
 *     defaultPerPage: 10
 *   });
 *   
 *   const totalPages = Math.ceil(totalItems / perPage);
 *   
 *   return (
 *     <Pagination
 *       currentPage={currentPage}
 *       totalPages={totalPages}
 *       onPageChange={setPage}
 *       onPerPageChange={setPerPage}
 *       perPage={perPage}
 *     />
 *   );
 * }
 * ```
 */
export function usePaginationWithSearchParams({
  defaultPage = 1,
  defaultPerPage = 10,
}: UsePaginationWithSearchParamsOptions = {}): UsePaginationWithSearchParamsReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current values from URL or use defaults
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : defaultPage;
    return page > 0 ? page : defaultPage;
  }, [searchParams, defaultPage]);

  const perPage = useMemo(() => {
    const perPageParam = searchParams.get("per_page");
    const perPageValue = perPageParam ? parseInt(perPageParam, 10) : defaultPerPage;
    return perPageValue > 0 ? perPageValue : defaultPerPage;
  }, [searchParams, defaultPerPage]);

  // Helper function to update URL search params
  const updateSearchParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value.toString());
        }
      });

      const newUrl = `${pathname}?${newSearchParams.toString()}`;
      router.push(newUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // Set page only
  const setPage = useCallback(
    (page: number) => {
      updateSearchParams({ page: page > 0 ? page : 1 });
    },
    [updateSearchParams]
  );

  // Set per page only (reset to page 1 when changing per page)
  const setPerPage = useCallback(
    (newPerPage: number) => {
      updateSearchParams({ 
        page: 1, 
        per_page: newPerPage > 0 ? newPerPage : defaultPerPage 
      });
    },
    [updateSearchParams, defaultPerPage]
  );

  // Set both page and per page
  const setPageAndPerPage = useCallback(
    (page: number, newPerPage: number) => {
      updateSearchParams({
        page: page > 0 ? page : 1,
        per_page: newPerPage > 0 ? newPerPage : defaultPerPage,
      });
    },
    [updateSearchParams, defaultPerPage]
  );

  // Reset to first page (useful for search/filter operations)
  const resetToFirstPage = useCallback(() => {
    updateSearchParams({ page: 1 });
  }, [updateSearchParams]);

  return {
    currentPage,
    perPage,
    setPage,
    setPerPage,
    setPageAndPerPage,
    resetToFirstPage,
  };
}