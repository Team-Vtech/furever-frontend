"use client";

import { Provider } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent } from "@furever/ui/components/card";
import { Edit2, Trash2, MapPin, Phone, Mail, User } from "lucide-react";

interface ProviderCardProps {
  provider: Provider;
  onEdit?: (provider: Provider) => void;
  onDelete?: (provider: Provider) => void;
}

export function ProviderCard({
  provider,
  onEdit,
  onDelete,
}: ProviderCardProps) {
  const getStatusBadge = () => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
        label: "Pending",
      },
      approved: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
        label: "Approved",
      },
      rejected: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
        label: "Rejected",
      },
      inactive: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
        label: "Inactive",
      },
    };

    const config = statusConfig[provider.status];

    return (
      <Badge
        className={`${config.bg} ${config.text} ${config.border} hover:${config.bg} px-3 py-1 text-xs font-medium`}
      >
        {config.label}
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
                {provider.business_name}
              </h3>
              {getStatusBadge()}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{provider.contact_person_name}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{provider.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{provider.phone_number}</span>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  {provider.location.address}, {provider.location.city},{" "}
                  {provider.location.state} {provider.location.postal_code},{" "}
                  {provider.location.country}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Created: {formatDate(provider.created_at)}</span>
              <span>Updated: {formatDate(provider.updated_at)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(provider)}
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
                onClick={() => onDelete(provider)}
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
