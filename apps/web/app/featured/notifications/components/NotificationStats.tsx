"use client";

import { NotificationStats as Stats } from "@furever/types";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Bell, BellRing, CheckCircle } from "lucide-react";

interface NotificationStatsProps {
    stats: Stats;
    isLoading?: boolean;
}

export function NotificationStats({ stats, isLoading }: NotificationStatsProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="pb-2">
                            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 w-1/3 rounded bg-gray-200"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
                    <Bell className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <p className="text-muted-foreground text-xs">All notifications received</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unread</CardTitle>
                    <BellRing className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
                    <p className="text-muted-foreground text-xs">{stats.unread > 0 ? "New notifications" : "All caught up!"}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Read</CardTitle>
                    <CheckCircle className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">{stats.read}</div>
                    <p className="text-muted-foreground text-xs">{stats.read > 0 ? "Notifications reviewed" : "No read notifications"}</p>
                </CardContent>
            </Card>
        </div>
    );
}
