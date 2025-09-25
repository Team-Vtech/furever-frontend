"use client";

import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent } from "@furever/ui/components/card";
import { Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { ServiceType } from "../types";
import { cn } from "@furever/ui/lib/utils";

interface ServiceTypeCardProps {
  serviceType: ServiceType;
  onEdit?: (serviceType: ServiceType) => void;
  onDelete?: (serviceType: ServiceType) => void;
}

export function ServiceTypeCard({
  serviceType,
  onEdit,
  onDelete,
}: ServiceTypeCardProps) {
  const getStatusBadge = () => {
    if (serviceType.status === "active") {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100 px-3 py-1 text-xs font-medium">
          Active
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 px-3 py-1 text-xs font-medium">
        Inactive
      </Badge>
    );
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border border-gray-200 rounded-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {serviceType.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {serviceType.description}
              </p>
            </div>
            <div className="ml-4 flex items-center space-x-2">
              {getStatusBadge()}
            </div>
          </div>

          {/* Image */}
          {serviceType.imageUrl ? (
            <div className="relative h-32 w-full rounded-lg overflow-hidden bg-gray-100">
              <img
                src={serviceType.imageUrl}
                alt={serviceType.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="relative h-32 w-full rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Updated {new Date(serviceType.updatedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center space-x-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(serviceType)}
                  className="h-8 px-3"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(serviceType)}
                  className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
