import LocationManagementScreen from "@/app/featured/locations/screens/LocationManagementScreen/LocationManagementScreen";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "My Locations - Furever",
    description: "Manage your addresses for pet care services",
};

export default function SettingsLocationsPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <LocationManagementScreen />
        </Suspense>
    );
}
