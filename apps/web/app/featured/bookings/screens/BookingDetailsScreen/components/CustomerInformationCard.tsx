"use client";

import { Booking } from "@furever/types";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Mail, Phone, User } from "lucide-react";

interface CustomerInformationCardProps {
    user: Booking["user"];
}

export function CustomerInformationCard({ user }: CustomerInformationCardProps) {
    return (
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
                        <p className="text-sm text-gray-900">{user.name}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="flex items-center text-sm text-gray-900">
                            <Mail className="mr-1 h-3 w-3" />
                            {user.email}
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <p className="flex items-center text-sm text-gray-900">
                            <Phone className="mr-1 h-3 w-3" />
                            {user.phone}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
