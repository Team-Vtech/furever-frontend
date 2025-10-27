import { NotificationsScreen } from "@/app/featured/notifications/screens/NotificationsScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Notifications | Furever",
    description: "Stay updated with your pet care service notifications, booking reminders, and important updates.",
};

export default function NotificationsPage() {
    return (
        <Suspense>
            <MainLayout>
                <NotificationsScreen />
            </MainLayout>
        </Suspense>
    );
}
