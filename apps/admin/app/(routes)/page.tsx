import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { DashboardStatistics, JsonResponse } from "@furever/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DashboardScreen } from "../featured/dashboard/screens/DashboardScreen";
import { server } from "../shared/utils/http.server.utils";

export default async function ProviderDashboardPage() {
    const statistics = await getDashboardStatistics();
    if (statistics === null) {
        return notFound();
    }

    return (
        <PageLayout title="Dashboard" breadcrumbs={[]}>
            <Suspense fallback={<div>Loading...</div>}>
                <DashboardScreen statistics={statistics.data.data} />
            </Suspense>
        </PageLayout>
    );
}

async function getDashboardStatistics() {
    try {
        return await (await server()).get<JsonResponse<DashboardStatistics>>("/admin/dashboard");
    } catch {
        return null;
    }
}
