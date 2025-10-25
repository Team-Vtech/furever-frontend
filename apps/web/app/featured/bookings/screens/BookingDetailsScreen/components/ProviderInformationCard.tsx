"use client";

import { Booking } from "@furever/types";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Mail, MapPin, Phone, Shield } from "lucide-react";

interface ProviderInformationCardProps {
    provider: Booking["provider"];
}

export function ProviderInformationCard({ provider }: ProviderInformationCardProps) {
    return (
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
                        <p className="text-sm text-gray-900">{provider.business_name}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Contact Email</label>
                        <p className="flex items-center text-sm text-gray-900">
                            <Mail className="mr-1 h-3 w-3" />
                            {provider.email}
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Contact Phone</label>
                        <p className="flex items-center text-sm text-gray-900">
                            <Phone className="mr-1 h-3 w-3" />
                            {provider.phone_number}
                        </p>
                    </div>
                    {provider.location && (
                        <div>
                            <label className="text-sm font-medium text-gray-600">Address</label>
                            <p className="flex items-center text-sm text-gray-900">
                                <MapPin className="mr-1 h-3 w-3" />
                                {provider.location.address}
                                {provider.location.city}, {provider.location.state}, {provider.location.country}
                                {provider.location.postal_code && ` ${provider.location.postal_code}`}
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
