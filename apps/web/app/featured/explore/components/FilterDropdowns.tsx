import { useFilter } from "@/app/shared/hooks/useFilter";
import { PetType } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Calendar } from "@furever/ui/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@furever/ui/components/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { cn } from "@furever/ui/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, MapPin, PawPrint, RotateCcw } from "lucide-react";
import { useExploreFilter } from "../hooks/use-filters-query";
import { DebouncedSearchBox } from "./DebouncedSearchBox/DebouncedSearchBox";

type ExploreFilter = ReturnType<typeof useExploreFilter>["filters"];

type ExploreFiltersProps = {
    filters: ExploreFilter;
};

export function ExploreFilters({ filters }: ExploreFiltersProps) {
    const { addFilter, getFilter, hasFilter, clearFilters, hasActiveFilters } = useFilter();

    return (
        <div className="border border-gray-200/60 bg-gray-50/50 p-4 shadow-sm">
            {/* Search and Filters Layout */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Search Box - Left Side */}
                <div className="flex-1 lg:max-w-md">
                    <DebouncedSearchBox
                        placeholder="Search providers or services..."
                        value={getFilter("q") || ""}
                        onSearch={(value) => addFilter("q", value)}
                        debounceMs={300}
                        className="w-full"
                    />
                </div>

                {/* Filter Dropdowns and Reset Button - Right Side */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    {/* Location Filter */}
                    <div className="space-y-2">
                        <div className="relative">
                            <DebouncedSearchBox
                                placeholder="Enter your location..."
                                value={getFilter("location") || ""}
                                onSearch={(value) => addFilter("location", value)}
                                debounceMs={300}
                                icon={<MapPin className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />}
                            />
                        </div>
                    </div>

                    {/* Pet Type Filter */}
                    <Select
                        value={getFilter("pet_type") || "all-pets"}
                        onValueChange={(value) => addFilter("pet_type", value === "all-pets" ? "" : value)}
                    >
                        <SelectTrigger className="h-10 border-gray-200 bg-white">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <PawPrint size={16} className="text-gray-500" />
                                <SelectValue placeholder="Pet Type" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-pets">All Pet Types</SelectItem>
                            {filters?.pet_types?.map((petType: PetType) => (
                                <SelectItem key={petType.id} value={String(petType.id)}>
                                    {petType.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="space-y-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn("w-full justify-start text-left font-normal", !hasFilter("date") && "text-muted-foreground")}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {hasFilter("date") ? format(new Date(getFilter("date")), "PPP") : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={hasFilter("date") ? new Date(getFilter("date")) : undefined}
                                    onSelect={(date: Date | undefined) => {
                                        if (date) {
                                            addFilter("date", date.toISOString());
                                        }
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Reset Filters Button */}
                    {hasActiveFilters() && (
                        <Button
                            variant="outline"
                            onClick={clearFilters}
                            className="h-10 border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                            size="sm"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset Filters
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
