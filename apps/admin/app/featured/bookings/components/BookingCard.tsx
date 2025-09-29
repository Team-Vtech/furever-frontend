"use client";

import { Booking } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent } from "@furever/ui/components/card";
import {
  Edit2,
  Trash2,
  User,
  Heart,
  Calendar,
  Clock,
  DollarSign,
} from "lucide-react";

interface BookingCardProps {
  booking: Booking;
  onEdit?: (booking: Booking) => void;
  onDelete?: (booking: Booking) => void;
}

export function BookingCard({ booking, onEdit, onDelete }: BookingCardProps) {
  const getStatusBadge = () => {
    const statusConfig = {
      pending: {
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: "Pending",
      },
      confirmed: {
        className: "bg-blue-100 text-blue-800 border-blue-200",
        label: "Confirmed",
      },
      in_progress: {
        className: "bg-purple-100 text-purple-800 border-purple-200",
        label: "In Progress",
      },
      completed: {
        className: "bg-green-100 text-green-800 border-green-200",
        label: "Completed",
      },
      cancelled: {
        className: "bg-red-100 text-red-800 border-red-200",
        label: "Cancelled",
      },
    };

    const config = statusConfig[booking.status];
    return (
      <Badge
        className={`${config.className} hover:${config.className} px-3 py-1 text-xs font-medium`}
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

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: string) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Booking #{booking.id}
              </h3>
              {getStatusBadge()}
            </div>

            {/* Customer and Pet Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{booking.user.name}</p>
                  <p className="text-gray-600">{booking.user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{booking.pet.name}</p>
                  <p className="text-gray-600">
                    {booking.pet.breed} • {booking.pet.pet_type.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Service and Provider Info */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {booking.service.name}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {booking.provider.business_name}
              </p>
              {booking.notes && (
                <p className="text-sm text-gray-600 italic">
                  "{booking.notes}"
                </p>
              )}
            </div>

            {/* Booking Details */}
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(booking.booking_date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatTime(booking.booking_time)}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">
                  {formatCurrency(booking.total_price)}
                </span>
              </div>
            </div>

            {/* Addons */}
            {booking.booking_addons && booking.booking_addons.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Add-ons:
                </p>
                <div className="flex flex-wrap gap-2">
                  {booking.booking_addons.map((addon) => (
                    <Badge key={addon.id} variant="outline" className="text-xs">
                      {addon.service_addon.addon.name} (x{addon.quantity})
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Created: {formatDate(booking.created_at)}</span>
              <span>Updated: {formatDate(booking.updated_at)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(booking)}
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
                onClick={() => onDelete(booking)}
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
