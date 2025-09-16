"use client";

import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent } from "@furever/ui/components/card";
import { Edit2, Trash2 } from "lucide-react";
import { Addon } from "../types/index";

interface AddonCardProps {
  addon: Addon;
  onEdit?: (addon: Addon) => void;
  onDelete?: (addon: Addon) => void;
}

export function AddonCard({ addon, onEdit, onDelete }: AddonCardProps) {
  const getStatusBadge = () => {
    if (addon.status === "active") {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {addon.name}
              </h3>
              {getStatusBadge()}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {addon.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Created: {formatDate(addon.created_at)}</span>
              <span>Updated: {formatDate(addon.updated_at)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(addon)}
                className="flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(addon)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
