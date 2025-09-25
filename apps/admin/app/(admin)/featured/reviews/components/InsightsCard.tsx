import React from "react";
import { Card } from "@furever/ui/components/card";
import { ServiceStats, PetTypeStats } from "../types/review.types";

interface InsightsCardProps {
  serviceStats: ServiceStats[];
  petTypeStats: PetTypeStats;
}

export function InsightsCard({
  serviceStats,
  petTypeStats,
}: InsightsCardProps) {
  const totalPets = petTypeStats.dogs + petTypeStats.cats;
  const dogPercentage =
    totalPets > 0 ? Math.round((petTypeStats.dogs / totalPets) * 100) : 0;
  const catPercentage =
    totalPets > 0 ? Math.round((petTypeStats.cats / totalPets) * 100) : 0;

  // Simple pie chart using CSS conic-gradient
  const pieChartStyle = {
    background: `conic-gradient(
      #8A75FF 0% ${dogPercentage}%, 
      #565D6D ${dogPercentage}% 100%
    )`,
  };

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
                  {service.serviceName} ({service.reviewCount} reviews)
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Pet Type Breakdown
            </h4>

            <div className="flex items-center gap-6">
              {/* Pie Chart */}
              <div className="relative">
                <div
                  className="w-32 h-32 rounded-full border-4 border-white"
                  style={pieChartStyle}
                />
                {/* Percentage labels */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs font-medium text-purple-500">
                    {dogPercentage}%
                  </span>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs font-medium text-gray-500">
                    {catPercentage}%
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-sm" />
                  <span className="text-sm text-gray-900">Dog</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-sm" />
                  <span className="text-sm text-gray-900">Cat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
