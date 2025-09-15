"use client";

import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent } from "@furever/ui/components/card";
import { Clock, DollarSign, Edit2, Trash2 } from "lucide-react";
import { Service } from "../types/service.types";
import { cn } from "@furever/ui/lib/utils";

interface ServiceCardProps {
  service: Service;
  onEdit?: (service: Service) => void;
  onDelete?: (service: Service) => void;
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  const formatDuration = (minutes: number) => {
    if (minutes >= 1440) {
      // 24 hours or more
      const days = Math.floor(minutes / 1440);
      const remainingHours = Math.floor((minutes % 1440) / 60);
      if (remainingHours > 0) {
        return `${days}d ${remainingHours}h`;
      }
      return `${days} ${days === 1 ? "day" : "days"}`;
    } else if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${hours}h`;
    }
    return `${minutes} minutes`;
  };

  const getStatusBadge = () => {
    if (service.status === "active") {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100 px-3 py-1 text-xs font-medium">
          Active
        </Badge>
      );
    }
    return (
      <Badge className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100 px-3 py-1 text-xs font-medium">
        Draft
      </Badge>
    );
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-200">
      <CardContent className="p-4 space-y-4">
        {/* Service Image */}
        <div className="w-full h-32 rounded-md bg-gray-100 overflow-hidden">
          {service.imageUrl ? (
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div
            className={cn(
              "w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center",
              service.imageUrl ? "hidden" : ""
            )}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🐾</div>
              <span className="text-gray-500 text-sm">Service Image</span>
            </div>
          </div>
        </div>

        {/* Service Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {service.name}
          </h3>
          {getStatusBadge()}
        </div>

        {/* Service Description */}
        <div className="text-sm text-gray-600 leading-relaxed">
          {service.description}
        </div>

        {/* Duration and Price */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(service.duration)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <DollarSign className="h-4 w-4" />
            <span>${service.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {service.categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-50 px-2 py-1 text-xs"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(service)}
            className="flex-1 h-9 hover:bg-gray-50 transition-colors"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(service)}
            className="flex-1 h-9 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
