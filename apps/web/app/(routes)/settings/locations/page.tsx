import { Suspense } from "react";
import LocationManagementScreen from "@/app/featured/locations/screens/LocationManagementScreen/LocationManagementScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Locations - Furever",
    description: "Manage your addresses for pet care services",
};

export default function SettingsLocationsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <LocationManagementScreen />
        </Suspense>
    );
}