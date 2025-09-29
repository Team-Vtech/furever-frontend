"use client";

import { Button } from "@furever/ui/components/button";
import { FileX, Plus, Search } from "lucide-react";

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
        <div className={`flex flex-col items-center justify-center px-4 py-12 text-center ${className}`}>
            <div className="bg-muted mb-4 rounded-full p-4">
                <IconComponent className="text-muted-foreground h-8 w-8" />
            </div>

            <h3 className="text-foreground mb-2 text-lg font-semibold">{title}</h3>

            <p className="text-muted-foreground mb-6 max-w-md text-sm">{description}</p>

            {actionLabel && onAction && (
                <Button onClick={onAction} variant="outline">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
