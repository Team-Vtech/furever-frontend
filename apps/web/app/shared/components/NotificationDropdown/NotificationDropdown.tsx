"use client";

import { NotificationsClient } from "@/app/featured/notifications/clients/notifications.client";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent } from "@furever/ui/components/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@furever/ui/components/dropdown-menu";
import { ScrollArea } from "@furever/ui/components/scroll-area";
import { Skeleton } from "@furever/ui/components/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Bell, BellRing, CheckCircle2, DollarSign, ExternalLink, Eye, Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    // Fetch recent notifications (last 5)
    const { data: notificationsData, isLoading: notificationsLoading } = useQuery({
        queryKey: ["notifications", "recent"],
        queryFn: () =>
            NotificationsClient.getNotifications({
                page: 1,
                per_page: 5,
            }),
        enabled: isOpen, // Only fetch when dropdown is open
    });

    // Fetch notification stats
    const { data: statsData } = useQuery({
        queryKey: ["notification-stats"],
        queryFn: () => NotificationsClient.getNotificationStats(),
    });

    // Mark as read mutation
    const markAsReadMutation = useMutation({
        mutationFn: NotificationsClient.markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["notification-stats"] });
        },
        onError: (error) => {
            toast.error("Failed to mark notification as read");
            console.error("Error marking as read:", error);
        },
    });

    // Delete notification mutation
    const deleteNotificationMutation = useMutation({
        mutationFn: NotificationsClient.deleteNotification,
        onSuccess: () => {
            toast.success("Notification deleted");
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["notification-stats"] });
        },
        onError: (error) => {
            toast.error("Failed to delete notification");
            console.error("Error deleting notification:", error);
        },
    });

    const notifications = notificationsData?.data?.data || [];
    const unreadCount = statsData?.data?.unread || 0;

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "App\\Notifications\\BookingCreatedNotification":
                return <Bell className="h-3 w-3 text-blue-500" />;
            case "App\\Notifications\\BookingConfirmedNotification":
                return <CheckCircle2 className="h-3 w-3 text-green-500" />;
            case "App\\Notifications\\BookingCancelledNotification":
                return <Heart className="h-3 w-3 text-red-500" />;
            case "App\\Notifications\\BookingCompletedNotification":
                return <Heart className="h-3 w-3 text-purple-500" />;
            case "App\\Notifications\\PaymentReceivedNotification":
                return <DollarSign className="h-3 w-3 text-green-500" />;
            case "App\\Notifications\\ReminderNotification":
                return <BellRing className="h-3 w-3 text-orange-500" />;
            default:
                return <Bell className="h-3 w-3 text-gray-500" />;
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

    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), "MMM d, h:mm a");
    };

    const handleMarkAsRead = (id: string) => {
        markAsReadMutation.mutate(id);
    };

    const handleDelete = (id: string) => {
        deleteNotificationMutation.mutate(id);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge variant="destructive" className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center p-0 text-xs">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {unreadCount} unread
                            </Badge>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <ScrollArea className="h-64">
                    <div className="p-2">
                        {notificationsLoading ? (
                            <div className="space-y-1">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <Skeleton className="h-2 w-2 rounded" />
                                            <Skeleton className="h-2 w-16" />
                                        </div>
                                        <Skeleton className="h-8 w-full" />
                                    </div>
                                ))}
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="py-8 text-center">
                                <Bell className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                <p className="text-sm text-gray-500">No notifications</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {notifications.map((notification) => (
                                    <Card
                                        key={notification.id}
                                        className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                                            !notification.is_read ? "border-l-2 border-l-blue-500 bg-blue-50/20" : ""
                                        }`}
                                    >
                                        <CardContent className="p-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex min-w-0 flex-1 items-start gap-2">
                                                    {getNotificationIcon(notification.type)}
                                                    <div className="min-w-0 flex-1">
                                                        <div className="mb-0.5 flex items-center gap-1">
                                                            <h4 className="truncate text-xs font-medium text-gray-900">
                                                                {getNotificationTitle(notification.type)}
                                                            </h4>
                                                            {!notification.is_read && (
                                                                <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                                                            )}
                                                        </div>
                                                        <p className="mb-1 text-xs text-gray-500">{formatDate(notification.created_at)}</p>
                                                        {notification.data.message && (
                                                            <p className="line-clamp-1 text-xs text-gray-700">{notification.data.message}</p>
                                                        )}
                                                        {notification.data.service_name && (
                                                            <p className="text-xs text-gray-600">{notification.data.service_name}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-shrink-0 items-center gap-0.5">
                                                    {!notification.is_read && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleMarkAsRead(notification.id);
                                                            }}
                                                            className="h-5 w-5 p-0 text-gray-400 hover:text-blue-600"
                                                        >
                                                            <Eye className="h-2.5 w-2.5" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(notification.id);
                                                        }}
                                                        className="h-5 w-5 p-0 text-gray-400 hover:text-red-600"
                                                    >
                                                        <Trash2 className="h-2.5 w-2.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <DropdownMenuSeparator />

                <div className="p-2">
                    <Button variant="ghost" className="w-full justify-center" asChild>
                        <Link href="/notifications" onClick={() => setIsOpen(false)}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View All Notifications
                        </Link>
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
