"use client";

import { Booking } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Heart, Mail, MapPin, Phone, Shield, Star, User } from "lucide-react";
import Link from "next/link";

interface BookingDetailsScreenProps {
    booking: Booking;
}

export function BookingDetailsScreen({ booking }: BookingDetailsScreenProps) {
    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), "EEEE, MMMM d, yyyy");
    };

    const formatTime = (timeStr: string) => {
        const [hours = "0", minutes = "0"] = timeStr.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return format(date, "h:mm a");
    };

    const getStatusColor = (status: Booking["status"]) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "confirmed":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "in_progress":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "completed":
                return "bg-green-100 text-green-800 border-green-200";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const selectedAddons = booking.booking_addons.flatMap((addon) => addon.service_addon) || [];
    const totalPrice = parseFloat(booking.total_price || "0");

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/bookings">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Bookings
                        </Button>
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
                            <p className="mt-2 text-gray-600">Booking ID: #{booking.id}</p>
                        </div>
                        <Badge className={`px-3 py-1 text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace("_", " ")}
                        </Badge>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Service Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Heart className="mr-2 h-5 w-5 text-purple-600" />
                                    Service Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{booking.service.name}</h3>
                                    <p className="text-gray-600">{booking.provider.business_name}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span className="text-sm">{formatDate(booking.booking_date)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="mr-2 h-4 w-4" />
                                        <span className="text-sm">{formatTime(booking.booking_time)}</span>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-gray-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">Service Price:</span>
                                        <span className="text-lg font-semibold text-gray-900">${booking.service.price}</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">Duration:</span>
                                        <span className="text-sm text-gray-900">{booking.service.duration_minutes} minutes</span>
                                    </div>
                                </div>

                                {selectedAddons.length > 0 && (
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium text-gray-700">Add-ons:</h4>
                                        <div className="space-y-2">
                                            {selectedAddons.map((addon) => (
                                                <div key={addon.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                    <span className="text-sm text-gray-700">{addon.addon.name}</span>
                                                    <span className="text-sm font-medium text-gray-900">${addon.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="my-3 border-t border-gray-200"></div>

                                <div className="flex items-center justify-between rounded-lg bg-purple-50 p-4">
                                    <span className="text-lg font-semibold text-gray-900">Total Price:</span>
                                    <span className="text-2xl font-bold text-purple-600">${totalPrice.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pet Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Heart className="mr-2 h-5 w-5 text-pink-600" />
                                    Pet Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Pet Name</label>
                                        <p className="text-sm text-gray-900">{booking.pet.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Breed</label>
                                        <p className="text-sm text-gray-900">{booking.pet.pet_breed?.name || "Mixed"}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Gender</label>
                                        <p className="text-sm capitalize text-gray-900">{booking.pet.gender}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Weight</label>
                                        <p className="text-sm text-gray-900">{booking.pet.weight} kg</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                                        <p className="text-sm text-gray-900">
                                            {booking.pet.date_of_birth ? format(new Date(booking.pet.date_of_birth), "MMM d, yyyy") : "Not specified"}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Vaccination Status</label>
                                        <p className="text-sm capitalize text-gray-900">{booking.pet.vaccination_status}</p>
                                    </div>
                                </div>

                                {booking.pet.notes && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Pet Notes</label>
                                        <p className="mt-1 rounded-lg bg-gray-50 p-3 text-sm text-gray-900">{booking.pet.notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Customer Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="mr-2 h-5 w-5 text-blue-600" />
                                    Customer Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Name</label>
                                        <p className="text-sm text-gray-900">{booking.user.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Email</label>
                                        <p className="flex items-center text-sm text-gray-900">
                                            <Mail className="mr-1 h-3 w-3" />
                                            {booking.user.email}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Phone</label>
                                        <p className="flex items-center text-sm text-gray-900">
                                            <Phone className="mr-1 h-3 w-3" />
                                            {booking.user.phone}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Provider Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Shield className="mr-2 h-5 w-5 text-green-600" />
                                    Provider Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Business Name</label>
                                        <p className="text-sm text-gray-900">{booking.provider.business_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Contact Email</label>
                                        <p className="flex items-center text-sm text-gray-900">
                                            <Mail className="mr-1 h-3 w-3" />
                                            {booking.provider.email}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Contact Phone</label>
                                        <p className="flex items-center text-sm text-gray-900">
                                            <Phone className="mr-1 h-3 w-3" />
                                            {booking.provider.phone_number}
                                        </p>
                                    </div>
                                    {booking.provider.location && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Address</label>
                                            <p className="flex items-center text-sm text-gray-900">
                                                <MapPin className="mr-1 h-3 w-3" />
                                                {booking.provider.location.address}
                                                {booking.provider.location.city}, {booking.provider.location.state},{" "}
                                                {booking.provider.location.country}
                                                {booking.provider.location.postal_code && ` ${booking.provider.location.postal_code}`}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Notes */}
                        {booking.notes && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Additional Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-900">{booking.notes}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Booking Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Booking Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Service:</span>
                                    <span className="text-sm font-medium text-gray-900">{booking.service.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Provider:</span>
                                    <span className="text-sm font-medium text-gray-900">{booking.provider.business_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Pet:</span>
                                    <span className="text-sm font-medium text-gray-900">{booking.pet.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Date:</span>
                                    <span className="text-sm font-medium text-gray-900">{formatDate(booking.booking_date)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Time:</span>
                                    <span className="text-sm font-medium text-gray-900">{formatTime(booking.booking_time)}</span>
                                </div>
                                <div className="my-3 border-t border-gray-200"></div>
                                <div className="flex justify-between">
                                    <span className="text-base font-semibold text-gray-900">Total:</span>
                                    <span className="text-lg font-bold text-purple-600">${totalPrice.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full" variant="outline">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Reschedule
                                </Button>
                                <Button className="w-full" variant="outline">
                                    <Phone className="mr-2 h-4 w-4" />
                                    Contact Provider
                                </Button>
                                {booking.status === "completed" && (
                                    <Button className="w-full" variant="outline">
                                        <Star className="mr-2 h-4 w-4" />
                                        Leave Review
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
