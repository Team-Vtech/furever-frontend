"use client";

import { FilterConfig, FilterValue } from "../../types/filter.types";
import { TextFilter } from "./TextFilter";
import { SelectFilter } from "./SelectFilter";
import { NumberFilter } from "./NumberFilter";
import { DateFilter } from "./DateFilter";
import DynamicFilterAutoCompleteInput from "../../../DynamicSelect";

interface DynamicFilterProps {
  config: FilterConfig;
  value: any;
  onChange: (value: any) => void;
}

export function DynamicFilter({ config, value, onChange }: DynamicFilterProps) {
  const filterProps = { config, value, onChange };

  switch (config.type) {
    case "text":
      return <TextFilter {...filterProps} />;
    case "select":
      return <SelectFilter {...filterProps} />;
    case "number":
      return <NumberFilter {...filterProps} />;
    case "date":
      return <DateFilter {...filterProps} />;
    case "dynamic-select":
      return <DynamicFilterAutoCompleteInput {...filterProps} />;
    default:
      return <TextFilter {...filterProps} />;
  }
}

interface DataTableFiltersProps {
  filters: FilterConfig[];
  filterValues: FilterValue;
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
}

export function DataTableFilters({
  filters,
  filterValues,
  onFilterChange,
  onClearFilters,
}: DataTableFiltersProps) {
  const hasActiveFilters = Object.values(filterValues).some(
    (value) =>
      value !== "" && value !== "all" && value !== null && value !== undefined
  );

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        {filters.map((filter) => (
          <DynamicFilter
            key={filter.key}
            config={filter}
            value={filterValues[filter.key] || ""}
            onChange={(value) => onFilterChange(filter.key, value)}
          />
        ))}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="h-10 px-4 py-2 text-sm font-medium text-muted-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
