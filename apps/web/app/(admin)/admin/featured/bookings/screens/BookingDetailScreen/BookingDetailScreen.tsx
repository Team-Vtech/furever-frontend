"use client";

import { useRouter } from "next/navigation";
import { useBookingQuery } from "../../hooks/useBookingQueries";
import { Button } from "@furever/ui/components/button";
import { Badge } from "@furever/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@furever/ui/components/card";
import {
  Edit,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Heart,
  Building,
  DollarSign,
} from "lucide-react";
import { PageLayout } from "@/app/(admin)/admin/shared/components/PageLayout/PageLayout";

interface BookingDetailScreenProps {
  bookingId: string;
}

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "confirmed":
      return "default";
    case "pending":
      return "secondary";
    case "completed":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

export function BookingDetailScreen({ bookingId }: BookingDetailScreenProps) {
  const router = useRouter();
  const { data: bookingData, isLoading, isError } = useBookingQuery(bookingId);

  const handleEdit = () => {
    router.push(`/admin/bookings/${bookingId}/edit`);
  };

  const handleBack = () => {
    router.push("/admin/bookings");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">
            Loading booking...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !bookingData?.data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading booking
          </h2>
          <p className="text-sm text-muted-foreground">
            Please try refreshing the page or go back to the bookings list
          </p>
        </div>
      </div>
    );
  }

  const booking = bookingData.data;
  const scheduledDateTime = new Date(
    `${booking.booking_date} ${booking.booking_time}`
  );

  return (
    <PageLayout
      title={`Booking Details - ${booking.id}`}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bookings
          </Button>
          <Button onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Booking
          </Button>
        </div>
      }
      breadcrumbs={[
        { label: "Bookings", href: "/admin/bookings" },
        { label: `Booking ${booking.id}`, href: "#" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Status</span>
              <Badge variant={getStatusBadgeVariant(booking.status)}>
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Date & Time
              </span>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {scheduledDateTime.toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {scheduledDateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Total Price
              </span>
              <span className="text-lg font-bold text-green-600">
                ${Number(booking.total_price).toFixed(2)}
              </span>
            </div>
            {booking.notes && (
              <div>
                <span className="text-sm font-medium text-gray-500">Notes</span>
                <p className="text-sm mt-1 p-2 bg-gray-50 rounded border">
                  {booking.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Name</span>
              <p className="text-sm font-medium">{booking.user.name}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Email</span>
              <p className="text-sm">{booking.user.email}</p>
            </div>
            {booking.user.phone && (
              <div>
                <span className="text-sm font-medium text-gray-500">Phone</span>
                <p className="text-sm">{booking.user.phone}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pet Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Pet Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Name</span>
              <p className="text-sm font-medium">{booking.pet.name}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Breed</span>
              <p className="text-sm">{booking.pet.breed}</p>
            </div>
            {booking.pet.weight && (
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Weight
                </span>
                <p className="text-sm">{booking.pet.weight} kg</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Service Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">
                Provider
              </span>
              <p className="text-sm font-medium">
                {booking.provider.business_name}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Service</span>
              <p className="text-sm font-medium">{booking.service.name}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Base Price
              </span>
              <p className="text-sm">
                ${Number(booking.service.price).toFixed(2)}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Duration
              </span>
              <p className="text-sm">
                {booking.service.duration_minutes} minutes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Add-ons */}
        {booking.booking_addons.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Add-ons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {booking.booking_addons.map((bookingAddon) => (
                  <div
                    key={bookingAddon.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded border"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {bookingAddon.service_addon.addon.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Quantity: {bookingAddon.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ${Number(bookingAddon.total_price).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${Number(bookingAddon.service_addon.price).toFixed(2)}{" "}
                        per {bookingAddon.service_addon.unit}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Add-ons Total:</span>
                    <span className="text-sm font-bold">
                      ${Number(booking.addons_total_cost).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}
