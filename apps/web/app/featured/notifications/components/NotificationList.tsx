"use client";

import { Notification } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Skeleton } from "@furever/ui/components/skeleton";
import { BellOff, CheckCircle2, Filter, RefreshCw } from "lucide-react";
import { useState } from "react";
import { NotificationCard } from "./NotificationCard";

interface NotificationListProps {
    notifications: Notification[];
    isLoading?: boolean;
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
    onMarkAllAsRead: () => void;
    onRefresh: () => void;
    showUnreadOnly?: boolean;
    onToggleUnreadOnly?: () => void;
}

export function NotificationList({
    notifications,
    isLoading,
    onMarkAsRead,
    onDelete,
    onMarkAllAsRead,
    onRefresh,
    showUnreadOnly,
    onToggleUnreadOnly,
}: NotificationListProps) {
    const [isMarkingAll, setIsMarkingAll] = useState(false);

    const handleMarkAllAsRead = async () => {
        setIsMarkingAll(true);
        try {
            await onMarkAllAsRead();
        } finally {
            setIsMarkingAll(false);
        }
    };

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <Skeleton className="h-4 w-4 rounded" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-20 w-full" />
                    </div>
                ))}
            </div>
        );
    }

    if (notifications.length === 0) {
        return (
            <div className="py-12 text-center">
                <BellOff className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">No notifications</h3>
                <p className="mb-4 text-gray-500">
                    {showUnreadOnly ? "You're all caught up! No unread notifications." : "You don't have any notifications yet."}
                </p>
                <Button variant="outline" onClick={onRefresh}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header Actions */}
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    {unreadCount > 0 && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {unreadCount} unread
                        </Badge>
                    )}
                </div>

                <div className="flex gap-2">
                    {onToggleUnreadOnly && (
                        <Button variant={showUnreadOnly ? "default" : "outline"} size="sm" onClick={onToggleUnreadOnly}>
                            <Filter className="mr-2 h-4 w-4" />
                            {showUnreadOnly ? "Show All" : "Unread Only"}
                        </Button>
                    )}

                    {unreadCount > 0 && (
                        <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} disabled={isMarkingAll}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            {isMarkingAll ? "Marking..." : "Mark All Read"}
                        </Button>
                    )}

                    <Button variant="ghost" size="sm" onClick={onRefresh}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {notifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} onMarkAsRead={onMarkAsRead} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
}
