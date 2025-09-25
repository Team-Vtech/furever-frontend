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
  ClipboardList,
  Mail,
  Phone,
  MapPin,
  PawPrint,
  Wallet,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";

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
    router.push(`/bookings/${bookingId}/edit`);
  };

  const handleBack = () => {
    router.push("/bookings");
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
        { label: "Bookings", href: "/bookings" },
        { label: `Booking ${booking.id}`, href: "#" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                <CardTitle>Booking #{booking.id}</CardTitle>
              </div>
              <Badge variant={getStatusBadgeVariant(booking.status)}>
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Type */}
              <div className="flex items-center gap-3">
                <ClipboardList className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Service Type
                  </span>
                  <p className="text-sm font-medium">{booking.service.name}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Date & Time
                  </span>
                  <p className="text-sm font-medium">
                    {scheduledDateTime.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {scheduledDateTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Duration
                  </span>
                  <p className="text-sm font-medium">
                    {Math.floor(booking.service.duration_minutes / 60)} hours
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Amount
                  </span>
                  <p className="text-sm font-medium">
                    ${Number(booking.total_price).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Payment Status */}
              <div className="flex items-center gap-3">
                <Wallet className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Payment Status
                  </span>
                  <div className="mt-1">
                    <Badge
                      variant="default"
                      className="bg-orange-500 text-white"
                    >
                      Paid
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Due Date
                </span>
                <p className="text-sm font-medium">
                  {new Date(booking.booking_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1">
                  Cancel Booking
                </Button>
                <Button className="flex-1 bg-purple-500 hover:bg-purple-600">
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pet Parent Details */}
          <Card>
            <CardHeader>
              <CardTitle>Pet Parent Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{booking.user.email}</span>
              </div>
              {booking.user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{booking.user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  123 Pet Lane, Cityville, CA 90210
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Pet Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PawPrint className="h-5 w-5" />
                Pet Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <PawPrint className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Species
                    </span>
                    <p className="text-sm font-medium">Dog</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Breed
                    </span>
                    <p className="text-sm font-medium">{booking.pet.breed}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Age</span>
                  <p className="text-sm font-medium">2 years old</p>
                </div>
                {booking.pet.weight && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Weight
                    </span>
                    <p className="text-sm font-medium">
                      {booking.pet.weight} kg
                    </p>
                  </div>
                )}
              </div>

              {/* Pet Image Placeholder */}
              <div className="mt-4">
                <div className="w-24 h-24 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center">
                  <PawPrint className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Booking History & Additional Sections */}
        <div className="space-y-6">
          {/* Booking History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Booking History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Past booking entries */}
              <div className="space-y-2">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Standard Grooming - September 10, 2024
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white text-xs">
                        Completed
                      </Badge>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-600">
                      Details for this past booking: Service type was Standard
                      Grooming, completed on September 10, 2024.
                    </p>
                    <Button
                      variant="link"
                      className="text-xs p-0 h-auto text-purple-500"
                    >
                      View
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Pawdicure & Spa - August 01, 2024
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white text-xs">
                        Completed
                      </Badge>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Dog Walking (30 min) - July 15, 2024
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500 text-white text-xs">
                        Cancelled
                      </Badge>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Quick Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Message Pet Parent
              </Button>
              <p className="text-xs text-gray-600 mt-2">
                Open a direct chat to discuss booking details.
              </p>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">$100.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">$8.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">-$5.00</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-bold text-lg">
                    ${Number(booking.total_price).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-600">Payment Method</span>
                <p className="text-sm font-medium">
                  Credit Card ending ****1234
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
