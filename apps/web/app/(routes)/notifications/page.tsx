import { NotificationsScreen } from "@/app/featured/notifications/screens/NotificationsScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";
import { Suspense } from "react";

export default function NotificationsPage() {
    return (
        <Suspense>
            <MainLayout>
                <NotificationsScreen />
            </MainLayout>
        </Suspense>
    );
}
