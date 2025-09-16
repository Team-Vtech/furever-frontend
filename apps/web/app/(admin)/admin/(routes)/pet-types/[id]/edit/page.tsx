import { PetTypesClient } from "@/app/(admin)/admin/featured/pet-types/clients/pet-types.client";
import EditPetTypeScreen from "../../../../featured/pet-types/screens/EditPetTypeScreen/EditPetTypeScreen";
import { Suspense } from "react";
import { PageLayout } from "@/app/(admin)/admin/shared/components/PageLayout/PageLayout";

export default async function EditPetTypePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const petType = await getPetType(id);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPetTypeScreen petType={petType.data} />
    </Suspense>
  );
}

async function getPetType(id: string) {
  return await PetTypesClient.getPetType(id);
}
