"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@furever/ui/components/popover";
import { Filter } from "lucide-react";
import {
  FilterConfig,
  FiltersFactory,
} from "../../FiltersFactory/FiltersFactory";
import { Button } from "@furever/ui/components/button";

type FilterProps = {
  initialData: Record<string, unknown>;
  config: FilterConfig[];
};

export function DataTableToolbar({ initialData, config }: FilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="w-6 h-6 stroke-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <FiltersFactory initialData={initialData} config={config} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
