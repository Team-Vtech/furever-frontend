"use client";

import { Notification } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader } from "@furever/ui/components/card";
import { format } from "date-fns";
import { Bell, BellRing, Calendar, Check, Clock, DollarSign, Heart, Trash2, X } from "lucide-react";
import { useState } from "react";

interface NotificationCardProps {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
}

export function NotificationCard({ notification, onMarkAsRead, onDelete }: NotificationCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), "MMM d, yyyy 'at' h:mm a");
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "App\\Notifications\\BookingCreatedNotification":
                return <Bell className="h-4 w-4 text-blue-500" />;
            case "App\\Notifications\\BookingConfirmedNotification":
                return <Check className="h-4 w-4 text-green-500" />;
            case "App\\Notifications\\BookingCancelledNotification":
                return <X className="h-4 w-4 text-red-500" />;
            case "App\\Notifications\\BookingCompletedNotification":
                return <Heart className="h-4 w-4 text-purple-500" />;
            case "App\\Notifications\\PaymentReceivedNotification":
                return <DollarSign className="h-4 w-4 text-green-500" />;
            case "App\\Notifications\\ReminderNotification":
                return <BellRing className="h-4 w-4 text-orange-500" />;
            default:
                return <Bell className="h-4 w-4 text-gray-500" />;
        }
    };

    const getNotificationTitle = (type: string) => {
        switch (type) {
            case "App\\Notifications\\BookingCreatedNotification":
                return "Booking Created";
            case "App\\Notifications\\BookingConfirmedNotification":
                return "Booking Confirmed";
            case "App\\Notifications\\BookingCancelledNotification":
                return "Booking Cancelled";
            case "App\\Notifications\\BookingCompletedNotification":
                return "Booking Completed";
            case "App\\Notifications\\PaymentReceivedNotification":
                return "Payment Received";
            case "App\\Notifications\\ReminderNotification":
                return "Reminder";
            default:
                return "Notification";
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(notification.id);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card className={`transition-all duration-200 hover:shadow-md ${!notification.is_read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""}`}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        {getNotificationIcon(notification.type)}
                        <div>
                            <h3 className="font-semibold text-gray-900">{getNotificationTitle(notification.type)}</h3>
                            <p className="text-sm text-gray-500">{formatDate(notification.created_at)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {!notification.is_read && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                New
                            </Badge>
                        )}
                        <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isDeleting} className="text-gray-400 hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="space-y-3">
                    {notification.data.message && <p className="text-gray-700">{notification.data.message}</p>}

                    {notification.data.booking_id && (
                        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                            {notification.data.service_name && (
                                <div className="flex items-center gap-2">
                                    <Heart className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">Service: {notification.data.service_name}</span>
                                </div>
                            )}

                            {notification.data.provider_name && (
                                <div className="flex items-center gap-2">
                                    <Bell className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">Provider: {notification.data.provider_name}</span>
                                </div>
                            )}

                            {notification.data.pet_name && (
                                <div className="flex items-center gap-2">
                                    <Heart className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">Pet: {notification.data.pet_name}</span>
                                </div>
                            )}

                            {notification.data.booking_date && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{format(new Date(notification.data.booking_date), "MMM d, yyyy")}</span>
                                </div>
                            )}

                            {notification.data.booking_time && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{notification.data.booking_time}</span>
                                </div>
                            )}

                            {notification.data.total_price && (
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">₹{notification.data.total_price}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {!notification.is_read && (
                        <div className="pt-2">
                            <Button variant="outline" size="sm" onClick={() => onMarkAsRead(notification.id)} className="w-full">
                                <Check className="mr-2 h-4 w-4" />
                                Mark as Read
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
