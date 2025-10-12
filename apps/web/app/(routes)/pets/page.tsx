import PetManagementScreen from "@/app/featured/pets/screens/PetManagementScreen/PetManagementScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";
import { Suspense } from "react";

export default function PetsPage() {
    return (
        <MainLayout>
            <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
                <PetManagementScreen />
            </Suspense>
        </MainLayout>
    );
}
