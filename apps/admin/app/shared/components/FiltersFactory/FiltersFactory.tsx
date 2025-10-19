"use client";

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

    return config.map((filter, index) => {
        const { type, filterKey, props } = filter;

        const value = filtersState.getFilterValue(filterKey) || "";

        return (
            <>
                {(() => {
                    switch (type) {
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

                        default:
                            return null;
                    }
                })()}
            </>
        );
    });
}
