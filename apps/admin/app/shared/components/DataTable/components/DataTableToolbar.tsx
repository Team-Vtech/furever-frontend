"use client";

import { Button } from "@furever/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@furever/ui/components/popover";
import { Filter } from "lucide-react";
import { FilterConfig, FiltersFactory } from "../../FiltersFactory/FiltersFactory";

type FilterProps = {
    initialData: Record<string, unknown>;
    config: FilterConfig[];
};

export function DataTableToolbar({ initialData, config }: FilterProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Filter className="h-6 w-6 stroke-gray-600" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <FiltersFactory initialData={initialData} config={config} />
            </PopoverContent>
        </Popover>
    );
}
