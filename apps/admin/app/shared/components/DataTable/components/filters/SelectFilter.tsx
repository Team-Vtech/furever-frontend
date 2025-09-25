"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@furever/ui/components/select";
import { FilterProps } from "../../types/filter.types";

export function SelectFilter({ config, value = "", onChange }: FilterProps) {
  const widthClass = getWidthClass(config.width);
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium">{config.label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={widthClass}>
          <SelectValue
            placeholder={
              config.placeholder || `Select ${config.label.toLowerCase()}...`
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {config.options?.map((option) => (
            <SelectItem
              key={option.value.toString()}
              value={option.value.toString()}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function getWidthClass(width?: "sm" | "md" | "lg" | "xl") {
  switch (width) {
    case "sm":
      return "w-32";
    case "md":
      return "w-48";
    case "lg":
      return "w-64";
    case "xl":
      return "w-80";
    default:
      return "w-48";
  }
}
