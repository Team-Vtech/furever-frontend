import { Suspense } from "react";
import PetManagementScreen from "@/app/featured/pets/screens/PetManagementScreen/PetManagementScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";

export default function PetsPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <PetManagementScreen />
      </Suspense>
    </MainLayout>
  );
}