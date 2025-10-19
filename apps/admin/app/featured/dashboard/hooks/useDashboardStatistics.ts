import { useQuery } from "@tanstack/react-query";
import { DashboardClient } from "../clients/dashboard.client";

export function useDashboardStatistics() {
    return useQuery({
        queryKey: ["dashboard-statistics"],
        queryFn: () => DashboardClient.getDashboardStatistics(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
}
