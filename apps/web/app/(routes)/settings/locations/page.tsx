import LocationManagementScreen from "@/app/featured/settings/screens/LocationManagementScreen/LocationManagementScreen";
import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, UserSettingsLocation } from "@furever/types";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "My Locations - Furever",
    description: "Manage your addresses for pet care services",
};

export default async function SettingsLocationsPage() {
    const locations = await getLocations();
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <LocationManagementScreen locations={locations ?? []} />
        </Suspense>
    );
}

async function getLocations() {
    try {
        const response = await (await server()).get<JsonResponse<UserSettingsLocation[]>>("/settings/locations");
        return response.data.data;
    } catch (error) {
        return null;
    }
}
