import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { BookingStatistics, JsonResponse } from "@furever/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DashboardScreen } from "../featured/dashboard/screens/DashboardScreen";
import { server } from "../shared/utils/http.server.utils";

export default async function ProviderDashboardPage() {
    const statistics = await getBookingsStatistics();
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

async function getBookingsStatistics() {
    try {
        return await (await server()).get<JsonResponse<BookingStatistics>>("/admin/bookings/statistics");
    } catch {
        return null;
    }
}
