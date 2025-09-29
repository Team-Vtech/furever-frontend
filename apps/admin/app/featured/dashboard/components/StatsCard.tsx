"use client";

import { Card, CardContent } from "@furever/ui/components/card";
import { cn } from "@furever/ui/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    className?: string;
}

export function StatsCard({ title, value, subtitle, icon, className }: StatsCardProps) {
    return (
        <Card className={cn("p-6", className)}>
            <CardContent className="p-0">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-muted-foreground text-sm font-medium">{title}</p>
                        <p className="text-3xl font-bold">{value}</p>
                        <p className="text-muted-foreground text-xs">{subtitle}</p>
                    </div>
                    <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-lg">{icon}</div>
                </div>
            </CardContent>
        </Card>
    );
}
