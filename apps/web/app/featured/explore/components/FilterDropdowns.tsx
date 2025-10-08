import { useFilter } from "@/app/shared/hooks/useFilter";
import { City, PetType } from "@furever/types";
import { Input } from "@furever/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { MapPin, PawPrint, Search } from "lucide-react";
import { useExploreFilter } from "../hooks/use-filters-query";

type ExploreFilter = ReturnType<typeof useExploreFilter>["filters"];

type ExploreFiltersProps = {
    filters: ExploreFilter;
};

export function ExploreFilters({ filters }: ExploreFiltersProps) {
    const { addFilter, getFilter } = useFilter();

    return (
        <div className="border border-gray-200/60 bg-gray-50/50 p-4 shadow-sm">
            {/* Search and Filters Layout */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Search Box - Left Side */}
                <div className="flex-1 lg:max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Search providers or services..."
                            value={getFilter("q") || ""}
                            onChange={(e) => addFilter("q", e.target.value)}
                            className="h-10 border-gray-200 bg-white pl-10"
                        />
                    </div>
                </div>

                {/* Filter Dropdowns - Right Side */}
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    {/* Location Filter */}
                    <Select
                        value={getFilter("location") || "all-locations"}
                        onValueChange={(value) => addFilter("location", value === "all-locations" ? "" : value)}
                    >
                        <SelectTrigger className="h-10 border-gray-200 bg-white">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <MapPin size={16} className="text-gray-500" />
                                <SelectValue placeholder="Location" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-locations">All Locations</SelectItem>
                            {filters?.locations?.cities?.map((city: City) => (
                                <SelectItem key={city.city} value={city.state.toLowerCase()}>
                                    {city.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

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
                </div>
            </div>
        </div>
    );
}
