import React from "react";
import { Card } from "@furever/ui/components/card";
import { Button } from "@furever/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@furever/ui/components/select";
import { Input } from "@furever/ui/components/input";
import { Label } from "@furever/ui/components/label";
import { Separator } from "@furever/ui/components/separator";
import { ReviewFilters } from "../types/review.types";

interface FilterSectionProps {
  filters: ReviewFilters;
  onFiltersChange: (filters: ReviewFilters) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

export function FilterSection({
  filters,
  onFiltersChange,
  onClearFilters,
  onApplyFilters,
}: FilterSectionProps) {
  const handleFilterChange = (key: keyof ReviewFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <Card className="p-12 bg-white border border-gray-200 shadow-sm">
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900">
          Filter & Sort Reviews
        </h3>

        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="service"
              className="text-sm font-medium text-gray-900"
            >
              Service
            </Label>
            <Select
              value={filters.service}
              onValueChange={(value) => handleFilterChange("service", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="dog-walking">Dog Walking</SelectItem>
                <SelectItem value="grooming">Grooming</SelectItem>
                <SelectItem value="cat-sitting">Cat Sitting</SelectItem>
                <SelectItem value="pet-taxi">Pet Taxi</SelectItem>
                <SelectItem value="obedience-training">
                  Obedience Training
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="petType"
              className="text-sm font-medium text-gray-900"
            >
              Pet Type
            </Label>
            <Select
              value={filters.petType}
              onValueChange={(value) => handleFilterChange("petType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Pet Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pet Types</SelectItem>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="rating"
              className="text-sm font-medium text-gray-900"
            >
              Rating
            </Label>
            <Select
              value={filters.rating}
              onValueChange={(value) => handleFilterChange("rating", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="dateRange"
              className="text-sm font-medium text-gray-900"
            >
              Date Range
            </Label>
            <Input
              id="dateRange"
              placeholder="Select a date range"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="text-sm text-gray-500"
            />
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClearFilters} className="px-6">
            Clear Filters
          </Button>
          <Button
            onClick={onApplyFilters}
            className="px-6 bg-purple-500 hover:bg-purple-600"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </Card>
  );
}
