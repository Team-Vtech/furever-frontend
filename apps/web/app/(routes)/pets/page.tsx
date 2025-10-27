import PetManagementScreen from "@/app/featured/pets/screens/PetManagementScreen/PetManagementScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";
import { server } from "@/app/shared/utils/http.server.utils";
import { Pet } from "@furever/types";
import { JsonResponse } from "@furever/types/src/general";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "My Pets | Furever",
    description: "Manage your pet profiles and information. Keep track of your furry friends' details and care history.",
};

export default async function PetsPage() {
    const pets = await getPets();
    return (
        <MainLayout>
            <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
                <PetManagementScreen pets={pets ?? []} />
            </Suspense>
        </MainLayout>
    );
}

async function getPets() {
    try {
        const response = await (await server()).get<JsonResponse<Pet[]>>("/pets");
        return response.data.data;
    } catch (error) {
        return null;
    }
}
