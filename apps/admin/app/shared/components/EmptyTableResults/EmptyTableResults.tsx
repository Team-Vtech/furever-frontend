"use client";

import { Button } from "@furever/ui/components/button";
import { FileX, Search, Plus } from "lucide-react";

interface EmptyTableResultsProps {
  title?: string;
  description?: string;
  icon?: "search" | "file" | "plus";
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyTableResults({
  title = "No results found",
  description = "No data matches your current filters. Try adjusting your search criteria.",
  icon = "search",
  actionLabel,
  onAction,
  className = "",
}: EmptyTableResultsProps) {
  const IconComponent = {
    search: Search,
    file: FileX,
    plus: Plus,
  }[icon];

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      <div className="rounded-full bg-muted p-4 mb-4">
        <IconComponent className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>

      <p className="text-sm text-muted-foreground max-w-md mb-6">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
