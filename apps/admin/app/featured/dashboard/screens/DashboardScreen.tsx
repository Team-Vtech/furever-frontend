import { DashboardStatistics } from "@furever/types";
import { Calendar, DollarSign, Server, Star, Users } from "lucide-react";
import { StatsCard } from "../components/StatsCard";

type DashboardScreenProps = {
    statistics?: DashboardStatistics;
};

const dynamicIconImports = {
    bookings: Calendar,
    revenue: DollarSign,
    users: Users,
    providers: Users,
    services: Server,
    reviews: Star,
};

export function DashboardScreen({ statistics }: DashboardScreenProps) {
    if (!statistics) {
        return <div>No statistics available</div>;
    }

    return (
        <div className="space-y-8">
            {/* Legacy Stats Cards for backward compatibility */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(statistics).map(([key, value]) => {
                    const Icon = dynamicIconImports[key as keyof typeof dynamicIconImports];
                    return (
                        <StatsCard
                            key={key}
                            title={value.title}
                            value={value.total}
                            subtitle={`${value.last_month} last month`}
                            icon={<Icon className="text-muted-foreground h-6 w-6" />}
                        />
                    );
                })}
            </div>
        </div>
    );
}
