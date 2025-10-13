"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type FilterValue = string;

export interface FilterState {
    [key: string]: FilterValue;
}

export interface UseFilterOptions {
    /**
     * Whether to replace the current URL or push a new one
     * @default false
     */
    replace?: boolean;
    /**
     * Base path to navigate to (useful for resetting filters)
     */
    basePath?: string;
    /**
     * Whether to scroll to top when filters change
     * @default true
     */
    scroll?: boolean;
}

export interface UseFilterReturn {
    /**
     * Current filter state parsed from search params
     */
    filters: FilterState;
    /**
     * Add or update a filter
     */
    addFilter: (key: string, value: FilterValue, withoutUpdateURL?: boolean) => void;
    /**
     * Remove a specific filter
     */
    removeFilter: (key: string) => void;
    /**
     * Clear all filters
     */
    clearFilters: () => void;
    /**
     * Reset all filters (alias for clearFilters)
     */
    resetFilters: () => void;
    /**
     * Update multiple filters at once
     */
    updateFilters: (filters: Partial<FilterState>) => void;
    /**
     * Check if a filter exists and has a value
     */
    hasFilter: (key: string) => boolean;
    /**
     * Check if any filters are currently active
     */
    hasActiveFilters: () => boolean;
    /**
     * Get a specific filter value
     */
    getFilter: (key: string) => FilterValue;
    /**
     * Get current search params as string
     */
    getSearchParams: () => string;
    /**
     * Get current search params as URLSearchParams object
     */
    getSearchParamsObject: () => URLSearchParams;
}

/**
 * Custom hook for managing filters through URL search parameters
 */
export function useFilter(options: UseFilterOptions = {}): UseFilterReturn {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { replace = false, basePath, scroll = true } = options;

    // Parse current filters from search params
    const filters = useMemo(() => {
        const filterState: FilterState = {};

        for (const [key, value] of searchParams.entries()) {
            filterState[key] = value;
        }

        return filterState;
    }, [searchParams]);

    // Helper function to serialize filter value to string
    const serializeValue = useCallback((value: FilterValue): string | string[] => {
        if (value === null || value === undefined) {
            return "";
        }
        if (Array.isArray(value)) {
            return value;
        }
        return value;
    }, []);

    // Helper function to update URL
    const updateURL = useCallback(
        (newParams: URLSearchParams) => {
            const url = basePath || window.location.pathname;
            const queryString = newParams.toString();
            const fullUrl = queryString ? `${url}?${queryString}` : url;

            if (replace) {
                router.replace(fullUrl, { scroll });
            } else {
                router.push(fullUrl, { scroll });
            }
        },
        [router, basePath, replace, scroll],
    );

    // Add or update a filter
    const addFilter = useCallback(
        (key: string, value: FilterValue, withoutUpdateURL?: boolean) => {
            const newParams = new URLSearchParams(searchParams.toString());

            if (value === null || value === undefined || value === "") {
                newParams.delete(key);
            } else {
                const serializedValue = serializeValue(value);

                // Remove existing values for this key
                newParams.delete(key);

                // Add new values
                if (Array.isArray(serializedValue)) {
                    serializedValue.forEach((v) => newParams.append(key, v));
                } else {
                    newParams.set(key, serializedValue);
                }
            }
            if (withoutUpdateURL) return;
            updateURL(newParams);
        },
        [searchParams, serializeValue, updateURL],
    );

    // Remove a specific filter
    const removeFilter = useCallback(
        (key: string) => {
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete(key);
            updateURL(newParams);
        },
        [searchParams, updateURL],
    );

    // Clear all filters
    const clearFilters = useCallback(() => {
        const newParams = new URLSearchParams();
        updateURL(newParams);
    }, [updateURL]);

    // Update multiple filters at once
    const updateFilters = useCallback(
        (newFilters: Partial<FilterState>) => {
            const newParams = new URLSearchParams(searchParams.toString());

            Object.entries(newFilters).forEach(([key, value]) => {
                if (value === null || value === undefined || value === "") {
                    newParams.delete(key);
                } else {
                    const serializedValue = serializeValue(value);

                    // Remove existing values for this key
                    newParams.delete(key);

                    // Add new values
                    if (Array.isArray(serializedValue)) {
                        serializedValue.forEach((v) => newParams.append(key, v));
                    } else {
                        newParams.set(key, serializedValue);
                    }
                }
            });

            updateURL(newParams);
        },
        [searchParams, serializeValue, updateURL],
    );

    // Check if a filter exists and has a value
    const hasFilter = useCallback(
        (key: string) => {
            return searchParams.has(key);
        },
        [searchParams],
    );

    // Check if any filters are currently active
    const hasActiveFilters = useCallback(() => {
        return searchParams.toString().length > 0;
    }, [searchParams]);

    // Get a specific filter value
    const getFilter = useCallback(
        (key: string): FilterValue => {
            return filters[key] || "";
        },
        [filters],
    );

    // Get current search params as string
    const getSearchParams = useCallback(() => {
        return searchParams.toString();
    }, [searchParams]);

    // Get current search params as URLSearchParams object
    const getSearchParamsObject = useCallback(() => {
        return new URLSearchParams(searchParams.toString());
    }, [searchParams]);

    return {
        filters,
        addFilter,
        removeFilter,
        clearFilters,
        resetFilters: clearFilters, // Alias for clearFilters
        updateFilters,
        hasFilter,
        hasActiveFilters,
        getFilter,
        getSearchParams,
        getSearchParamsObject,
    };
}
