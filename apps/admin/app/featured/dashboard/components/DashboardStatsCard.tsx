"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Badge } from "@furever/ui/components/badge";
import { DashboardStatistics } from "@furever/types";
import { 
    Calendar, 
    DollarSign, 
    TrendingUp, 
    Users, 
    Star, 
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from "lucide-react";

interface DashboardStatsCardProps {
    statistics: DashboardStatistics;
    className?: string;
}

export function DashboardStatsCard({ statistics, className }: DashboardStatsCardProps) {
    // Calculate additional metrics
    const totalBookings = statistics.total_bookings;
    const totalRevenue = parseFloat(statistics.total_revenue);
    const upcomingBookings = statistics.up_coming_bookings.length;
    
    // Calculate booking status breakdown
    const statusBreakdown = statistics.bookings_by_status.reduce((acc, item) => {
        acc[item.service_name] = item.count;
        return acc;
    }, {} as Record<string, number>);

    // Get top providers
    const topProviders = statistics.bookings_per_provider
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

    // Get top services
    const topServices = Object.entries(statistics.bookings_per_service)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);

    const statsItems = [
        {
            title: "Total Bookings",
            value: totalBookings.toString(),
            subtitle: "All time bookings",
            icon: <Calendar className="h-5 w-5" />,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            subtitle: "Lifetime earnings",
            icon: <DollarSign className="h-5 w-5" />,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Upcoming Bookings",
            value: upcomingBookings.toString(),
            subtitle: "Scheduled appointments",
            icon: <Clock className="h-5 w-5" />,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "Active Providers",
            value: statistics.bookings_per_provider.length.toString(),
            subtitle: "Service providers",
            icon: <Users className="h-5 w-5" />,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Main Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statsItems.map((item, index) => (
                    <Card key={index} className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {item.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${item.bgColor}`}>
                                <div className={item.color}>
                                    {item.icon}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {item.subtitle}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Detailed Statistics */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Providers */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Top Providers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {topProviders.map((provider, index) => (
                                <div key={provider.provider_id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium">{provider.provider_name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {provider.count} bookings
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary">
                                        {provider.count}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Services */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5" />
                            Popular Services
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {topServices.map(([serviceName, count], index) => (
                                <div key={serviceName} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium">{serviceName}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {count} bookings
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary">
                                        {count}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Booking Status Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Booking Status Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(statusBreakdown).map(([serviceName, count]) => (
                            <div key={serviceName} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                                    <span className="font-medium">{serviceName}</span>
                                </div>
                                <Badge variant="outline">
                                    {count}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
