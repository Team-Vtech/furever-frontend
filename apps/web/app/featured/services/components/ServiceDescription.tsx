"use client";

import { Button } from "@furever/ui/components/button";
import { useState } from "react";

type ServiceDescriptionProps = {
    description: string;
};

export function ServiceDescription({ description }: ServiceDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const fullDescription = description;

    const truncatedDescription = fullDescription.substring(0, 200) + "...";

    return (
        <div className="p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Description</h2>

            <div className="mb-4 rounded-lg bg-white p-4">
                <p className="text-sm leading-relaxed text-gray-800">{isExpanded ? fullDescription : truncatedDescription}</p>
            </div>

            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-auto p-0 font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700"
            >
                {isExpanded ? "Show Less" : "Read More"}
            </Button>
        </div>
    );
}
