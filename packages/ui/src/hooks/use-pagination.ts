import { useCallback, useMemo, useState } from "react";

export interface UsePaginationParams {
    defaultPage?: number;
    defaultPerPage?: number;
    totalItems?: number;
}

export interface UsePaginationReturn {
    currentPage: number;
    perPage: number;
    totalPages: number;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    setPageAndPerPage: (page: number, perPage: number) => void;
    canGoPrevious: boolean;
    canGoNext: boolean;
}

/**
 * Basic pagination hook for managing pagination state
 *
 * @param options - Configuration options
 * @returns Object containing current pagination state and setters
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { currentPage, perPage, totalPages, setPage, setPerPage } = usePagination({
 *     defaultPage: 1,
 *     defaultPerPage: 10,
 *     totalItems: 100
 *   });
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
export function usePagination({ defaultPage = 1, defaultPerPage = 10, totalItems = 0 }: UsePaginationParams = {}): UsePaginationReturn {
    const [currentPage, setCurrentPage] = useState(defaultPage);
    const [perPage, setCurrentPerPage] = useState(defaultPerPage);

    const totalPages = useMemo(() => {
        return Math.ceil(totalItems / perPage);
    }, [totalItems, perPage]);

    const canGoPrevious = useMemo(() => currentPage > 1, [currentPage]);
    const canGoNext = useMemo(() => currentPage < totalPages, [currentPage, totalPages]);

    // Set page only
    const setPage = useCallback(
        (page: number) => {
            const validPage = Math.max(1, Math.min(page, totalPages || 1));
            setCurrentPage(validPage);
        },
        [totalPages],
    );

    // Set per page only (reset to page 1 when changing per page)
    const setPerPage = useCallback((newPerPage: number) => {
        const validPerPage = Math.max(1, newPerPage);
        setCurrentPerPage(validPerPage);
        setCurrentPage(1);
    }, []);

    // Set both page and per page
    const setPageAndPerPage = useCallback(
        (page: number, newPerPage: number) => {
            const validPerPage = Math.max(1, newPerPage);
            const newTotalPages = Math.ceil(totalItems / validPerPage);
            const validPage = Math.max(1, Math.min(page, newTotalPages || 1));

            setCurrentPerPage(validPerPage);
            setCurrentPage(validPage);
        },
        [totalItems],
    );

    return {
        currentPage,
        perPage,
        totalPages,
        setPage,
        setPerPage,
        setPageAndPerPage,
        canGoPrevious,
        canGoNext,
    };
}
