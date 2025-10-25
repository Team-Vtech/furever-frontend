import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CreateButton } from "@/app/shared/components/CreateButton";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { Suspense } from "react";
import { BookingsListingScreen } from "../../featured/bookings/screens/BookingsListingScreen/BookingsListingScreen";

export const metadata: Metadata = {
    title: "Bookings Management",
    description: "Manage customer bookings and appointments",
};

export default async function BookingsPage() {
    return (
        <PageLayout
            title="Bookings Management"
            description="Manage customer bookings and appointments"
            breadcrumbs={[{ label: "Bookings", href: "/bookings" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any bookings", "create own bookings"]}>
                    <CreateButton label="Create Booking" href="/bookings/create" />
                </Authorize>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <BookingsListingScreen />
            </Suspense>
        </PageLayout>
    );
}
