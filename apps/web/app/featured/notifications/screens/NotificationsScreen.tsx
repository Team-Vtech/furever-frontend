"use client";

import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { NotificationsClient } from "../clients/notifications.client";
import { NotificationList } from "../components/NotificationList";

export function NotificationsScreen() {
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const queryClient = useQueryClient();

    // Fetch notifications
    const {
        data: notificationsData,
        isLoading: notificationsLoading,
        error: notificationsError,
        refetch: refetchNotifications,
    } = useQuery({
        queryKey: ["notifications", { page: currentPage, unread_only: showUnreadOnly }],
        queryFn: () =>
            NotificationsClient.getNotifications({
                page: currentPage,
                per_page: 20,
                unread_only: showUnreadOnly,
            }),
    });

    // Mark all as read mutation
    const markAllAsReadMutation = useMutation({
        mutationFn: NotificationsClient.markAllAsRead,
        onSuccess: () => {
            toast.success("All notifications marked as read");
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            toast.error("Failed to mark notifications as read");
            console.error("Error marking all as read:", error);
        },
    });

    // Mark single notification as read mutation
    const markAsReadMutation = useMutation({
        mutationFn: NotificationsClient.markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
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
        },
        onError: (error) => {
            toast.error("Failed to delete notification");
            console.error("Error deleting notification:", error);
        },
    });

    const handleMarkAllAsRead = () => {
        markAllAsReadMutation.mutate();
    };

    const handleMarkAsRead = (id: string) => {
        markAsReadMutation.mutate(id);
    };

    const handleDelete = (id: string) => {
        deleteNotificationMutation.mutate(id);
    };

    const handleRefresh = () => {
        refetchNotifications();
    };

    const handleToggleUnreadOnly = () => {
        setShowUnreadOnly(!showUnreadOnly);
        setCurrentPage(1);
    };

    const notifications = notificationsData?.data?.data || [];

    if (notificationsError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-red-600">Error</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-4 text-gray-600">Failed to load notifications. Please try again.</p>
                        <Button onClick={handleRefresh} variant="outline">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-2 flex items-center gap-3">
                        <Bell className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                    </div>
                    <p className="text-gray-600">Stay updated with your booking notifications and important updates.</p>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <NotificationList
                        notifications={showUnreadOnly ? notifications.filter((n) => !n.is_read) : notifications}
                        isLoading={notificationsLoading}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                        onMarkAllAsRead={handleMarkAllAsRead}
                        onRefresh={handleRefresh}
                        showUnreadOnly={showUnreadOnly}
                        onToggleUnreadOnly={handleToggleUnreadOnly}
                    />
                </div>

                {/* Pagination */}
                {notificationsData?.data?.meta && notificationsData.data.meta.last_page > 1 && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
                                Previous
                            </Button>
                            <span className="flex items-center px-4 py-2 text-sm text-gray-600">
                                Page {currentPage} of {notificationsData.data.meta.last_page}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={currentPage === notificationsData.data.meta.last_page}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
