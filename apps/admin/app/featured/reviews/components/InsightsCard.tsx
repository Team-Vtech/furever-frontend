import React from "react";
import { Card } from "@furever/ui/components/card";
import { ServiceStats, PetTypeStats } from "../types/review.types";

interface InsightsCardProps {
  serviceStats: {
    service_id: number;
    name: string;
    count: number;
  }[];
}

export function InsightsCard({ serviceStats }: InsightsCardProps) {
  return (
    <Card className="p-12 bg-white border border-gray-200 shadow-sm">
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900">Insights</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Most Reviewed Services
            </h4>
            <div className="space-y-3">
              {serviceStats.map((service, index) => (
                <div key={index} className="text-sm text-gray-900">
                  {service.name} ({service.count} reviews)
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
