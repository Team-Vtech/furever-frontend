import { forEach } from "lodash";
import type { useRouter } from "next/navigation";

export type FilterType<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T,
> = {
  id: K;
  field: K;
  value: string;
};

export type FilterMeta<TData> = {
  filterKey: string;
  filterValue: (row: TData) => string;
  label: string;
};

export type ColumnMeta<TData> = {
  filter?: FilterMeta<TData>[];
};

export function parseFiltersFromSearchParams<
  T extends Record<string, unknown | null>,
>(
  searchParams: URLSearchParams
): {
  filters: FilterType<T>[];
  filtersParams: Partial<T>;
  hasNoFilters: boolean;
} {
  const filters: FilterType<T>[] = [];
  const filtersParams: Partial<T> = {};


  for (const [key, value] of searchParams.entries()) {
    filtersParams[key as keyof T] = value as T[keyof T];
    filters.push({
      id: key as keyof T,
      field: key as keyof T,
      value,
    });
    (filtersParams as any)[key] = value;
  }
  const hasNoFilters = filters.length === 0;

  return {
    filters,
    filtersParams,
    hasNoFilters,
  };
}

export function hasFilter<T extends Record<string, string>>(
  filters: FilterType<T>[],
  field: string,
  value: string
): boolean {
  return filters.some(
    (filter) => filter.field === field && filter.value === String(value)
  );
}

export function getFilterId<T extends Record<string, string>>(
  filters: FilterType<T>[],
  field: string
) {
  const filter = filters.find((filter) => filter.field === field);
  return filter?.id;
}

export function hasAnyFilterForField<T extends Record<string, string>>(
  filters: FilterType<T>[],
  field: string
): boolean {
  return filters.some((filter) => filter.field === field);
}

export function createFilter<T extends Record<string, string>>(
  field: string,
  value: string
): FilterType<T> {
  return {
    id: field,
    field,
    value,
  };
}

export function addFilter<T extends Record<string, string>>(
  filters: FilterType<T>[],
  filter: Omit<FilterType<T>, "id">
): FilterType<T>[] {
  const newFilter = {
    ...filter,
    id: filter.field,
  };

  return [...filters, newFilter];
}

export function removeFilter<T extends Record<string, string>>(
  filters: FilterType<T>[],
  id: string
): FilterType<T>[] {
  return filters.filter((filter) => filter.id !== id);
}

export function updateFiltersInUrl<T extends Record<string, string>>(
  filters: FilterType<T>[],
  router: ReturnType<typeof useRouter>,
  pathname: string
): void {
  const params = serializeFiltersToSearchParams(filters);
  router.replace(`${pathname}?${params.toString()}`, {
    scroll: false,
  });
}

export function serializeFiltersToSearchParams<
  T extends Record<string, unknown>,
>(filters: FilterType<T>[]): URLSearchParams {
  const params = new URLSearchParams();
  filters.forEach((filter) => {
    params.append(filter.field as string, filter.value);
  });

  return params;
}
