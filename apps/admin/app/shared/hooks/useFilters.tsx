"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  addFilter,
  createFilter,
  getFilterId,
  hasAnyFilterForField,
  hasFilter,
  parseFiltersFromSearchParams,
  removeFilter,
  updateFiltersInUrl,
} from "../utils/filter.utils";

export function useFilters<Filters extends Record<string, any>>(
  queryObj?: Filters,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filters, filtersParams } = parseFiltersFromSearchParams<{
    [key: string]: string;
  }>(searchParams);

  function add(
    field: string,
    value: string,
    syncUrl: boolean = true,
  ) {
    if (value === undefined || value === null) return;

    const existingFilterId = getFilterId(filters, field);
    if (value === "" && existingFilterId) {
      remove(field);
      return;
    }
    if (existingFilterId) {
      const updatedFilters = filters.map((filter) =>
        filter.id === existingFilterId
          ? createFilter(field, String(value))
          : filter,
      );
      if (syncUrl) {
        updateFiltersInUrl(updatedFilters, router, pathname);
      }
    } else {
      const newFilters = addFilter(
        filters,
        createFilter(field, String(value)),
      );
      if (syncUrl) {
        updateFiltersInUrl(newFilters, router, pathname);
      }
    }
  }

  function remove(field: string) {
    const filterId = getFilterId(filters, field);
    if (!filterId) return;
    const newFilters = removeFilter(filters, filterId as string);
    updateFiltersInUrl(newFilters, router, pathname);
  }

  function removeFilterById(id: string) {
    const newFilters = removeFilter(filters, id);
    updateFiltersInUrl(newFilters, router, pathname);
  }

  function has(
    field: string,
    value: string,
  ) {
    return hasFilter(filters, field, value);
  }

  function hasAnyFilter(
    field: string,
  ) {
    return hasAnyFilterForField(filters, field);
  }

  function resetFilters() {
    router.push(pathname);
  }

  function getFilterValue(
    field: string,
  ): string | undefined {
    console.log(field, filters);
    const filter = filters.find(
      (filter) => filter.field === field,
    );
    return filter?.value;
  }

  function addFilters(
    filtersToAdd: {
      field: string;
      value: string;
    }[],
  ) {
    const updatedFilters = filters.map((filter) => {
      const matchingFilter = filtersToAdd.find(
        (newFilter) =>
          newFilter.field === filter.field,
      );
      return matchingFilter
        ? createFilter(
            filter.field as string,
            String(matchingFilter.value),
          )
        : filter;
    });

    const newFiltersToAdd = filtersToAdd.filter(
      (newFilter) =>
        !filters.some(
          (filter) =>
            filter.field === newFilter.field ,
        ),
    );

    const finalFilters = [
      ...updatedFilters,
      ...newFiltersToAdd.map((filter) =>
        createFilter(filter.field, String(filter.value)),
      ),
    ];

    updateFiltersInUrl(finalFilters, router, pathname);
  }

  const areFiltersDirty = Object.keys(filtersParams).some((key) => {
    const value = getFilterValue(key);
    return (value ? value : "") !== queryObj?.[key];
  });

  const activeFilters = Object.keys(filtersParams).reduce(
    (acc, key) => {
      const value = getFilterValue(key);
      if (value && value !== "") {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  function handleFilterToggle(param: string, value: string | null) {
    if (!value) return;
    if (has(param, value)) {
      remove(param);
    } else {
      add(param, value, true);
    }
  }

  const activeFiltersCount = Object.keys(activeFilters).length;

  return {
    addFilter: add,
    removeFilter: remove,
    removeFilterById,
    hasFilter: has,
    hasAnyFilter,
    resetFilters,
    getFilterValue,
    filters,
    areFiltersDirty,
    activeFilters,
    activeFiltersCount,
    handleFilterToggle,
    addFilters,
  };
}