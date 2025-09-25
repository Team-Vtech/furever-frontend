"use client";

import { Table } from "@tanstack/react-table";

import { ColumnVisibilityToggle } from "./ColumnVisibilityToggle";
import { DataTableSearch } from "./DataTableSearch";
import { FilterConfig, FilterValue } from "../types";
import { DataTableFilters } from "./filters";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  showColumnVisibility?: boolean;
  children?: React.ReactNode;
  filters: FilterConfig[];
  filterValues: FilterValue;
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  showSearch = true,
  showColumnVisibility = true,
  children,
  filters,
  filterValues,
  onFilterChange: handleFilterChange,
  onClearFilters: handleClearFilters,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex flex-1 items-center space-x-2">
        {showSearch && onSearchChange && (
          <DataTableSearch
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        )}
        {/* Future filter components can be added here */}
        {children}
      </div>
      <div className="flex items-center space-x-2">
        {filters.length > 0 && (
          <div className="mb-4">
            <DataTableFilters
              filters={filters}
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}
        {showColumnVisibility && <ColumnVisibilityToggle table={table} />}
      </div>
    </div>
  );
}
