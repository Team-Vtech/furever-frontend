"use client";

import { useState } from "react";
import { Button } from "@furever/ui/components/button";

type ServiceDescriptionProps = {
  description: string;
};

export function ServiceDescription({ description }: ServiceDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullDescription = description;

  const truncatedDescription = fullDescription.substring(0, 200) + "...";

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>

      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-800 leading-relaxed">
          {isExpanded ? fullDescription : truncatedDescription}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0 h-auto font-medium"
      >
        {isExpanded ? "Show Less" : "Read More"}
      </Button>
    </div>
  );
}
