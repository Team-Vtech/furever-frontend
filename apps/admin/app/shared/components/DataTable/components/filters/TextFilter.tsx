"use client";

import { Input } from "@furever/ui/components/input";
import { FilterProps } from "../../types/filter.types";

export function TextFilter({ config, value, onChange }: FilterProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium">{config.label}</label>
      <Input
        placeholder={
          config.placeholder || `Filter by ${config.label.toLowerCase()}...`
        }
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={getWidthClass(config.width)}
      />
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
