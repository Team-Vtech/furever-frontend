"use client";

import { Booking } from "@furever/types";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { format } from "date-fns";
import { Calendar, Clock, Heart } from "lucide-react";

interface ServiceInformationCardProps {
    service: Booking["service"];
    provider: Booking["provider"];
    bookingDate: string;
    bookingTime: string;
    selectedAddons: Array<{
        id: number;
        addon: {
            name: string;
        };
        price: string;
    }>;
    totalPrice: number;
}

export function ServiceInformationCard({ service, provider, bookingDate, bookingTime, selectedAddons, totalPrice }: ServiceInformationCardProps) {
    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), "EEEE, MMMM d, yyyy");
    };

    const formatTime = (timeStr: string) => {
        const [hours = "0", minutes = "0"] = timeStr.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return format(date, "h:mm a");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-purple-600" />
                    Service Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-gray-600">{provider.business_name}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center text-gray-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span className="text-sm">{formatDate(bookingDate)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Clock className="mr-2 h-4 w-4" />
                        <span className="text-sm">{formatTime(bookingTime)}</span>
                    </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Service Price:</span>
                        <span className="text-lg font-semibold text-gray-900">${service.price}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Duration:</span>
                        <span className="text-sm text-gray-900">{service.duration_minutes} minutes</span>
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
    );
}
