"use client";

import { Button } from "@furever/ui/components/button";
import { X } from "lucide-react";
import { Fragment } from "react";
import { useFilters } from "../../hooks/useFilters";
import DebouncedTextField from "../DebouncedTextField/DebouncedTextField";
import DynamicFilterAutoCompleteInput from "../DynamicSelect";
import { FilterDate } from "../FilterDate/FilterDate";
import { FilterSelect } from "../FilterSelect/FilterSelect";

type ComponentMap = {
    text: typeof DebouncedTextField;
    dynamicSelect: typeof DynamicFilterAutoCompleteInput;
    select: typeof FilterSelect;
    date: typeof FilterDate;
};

export type FilterProps<T extends keyof ComponentMap> = React.ComponentProps<ComponentMap[T]>;

export type FilterConfig<T extends keyof ComponentMap = keyof ComponentMap> = {
    type: T;
    filterKey: string;
    props?: Partial<FilterProps<T>>;
};

export type FiltersFactoryProps = {
    config: FilterConfig[];
    initialData: Record<string, unknown>;
};

export function FiltersFactory({ config, initialData }: FiltersFactoryProps) {
    const filtersState = useFilters<Record<string, unknown>>(initialData);
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Active Filters: {filtersState.activeFiltersCount}</span>
                {filtersState.activeFiltersCount > 0 && (
                    <Button variant="outline" onClick={filtersState.resetFilters} className="flex items-center gap-2">
                        <X className="h-4 w-4" />
                        <span className="text-sm">Reset Filters</span>
                    </Button>
                )}
            </div>
            {config.map((filter, index) => {
                const { type, filterKey, props } = filter;
                const value = filtersState.getFilterValue(filterKey) || "";

                return (
                    <Fragment key={filterKey}>
                        {(() => {
                            switch (type) {
                                case "select": {
                                    const componentProps = props as FilterProps<typeof type>;
                                    return (
                                        <FilterSelect
                                            key={index}
                                            {...componentProps}
                                            value={value}
                                            setValue={(value) => {
                                                filtersState?.addFilter(filterKey, value);
                                            }}
                                        />
                                    );
                                }
                                case "text": {
                                    const componentProps = props as FilterProps<typeof type>;
                                    return (
                                        <DebouncedTextField
                                            key={index}
                                            {...componentProps}
                                            value={value}
                                            onChange={(e) => {
                                                filtersState?.addFilter(filterKey, e.target.value);
                                            }}
                                        />
                                    );
                                }
                                case "date": {
                                    const componentProps = props as FilterProps<typeof type>;
                                    return (
                                        <FilterDate
                                            key={index}
                                            {...componentProps}
                                            value={value}
                                            setValue={(value) => {
                                                filtersState?.addFilter(filterKey, value);
                                            }}
                                        />
                                    );
                                }
                                case "dynamicSelect": {
                                    const componentProps = props as FilterProps<typeof type>;
                                    return (
                                        <DynamicFilterAutoCompleteInput
                                            key={index}
                                            {...componentProps}
                                            value={value}
                                            setValue={(value) => {
                                                filtersState?.addFilter(filterKey, value);
                                            }}
                                        />
                                    );
                                }
                                default:
                                    return null;
                            }
                        })()}
                    </Fragment>
                );
            })}
        </div>
    );
}
