import { PetTypesClient } from "@/app/(admin)/featured/pet-types/clients/pet-types.client";
import EditPetTypeScreen from "../../../../featured/pet-types/screens/EditPetTypeScreen/EditPetTypeScreen";
import { Suspense } from "react";
import { PetType } from "@furever/types";
import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse } from "@/app/shared/types/general";

export default async function EditPetTypePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const petType = await getPetType(id);
  if (!petType) {
    return <div>Pet type not found</div>;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPetTypeScreen petType={petType.data.data} />
    </Suspense>
  );
}

async function getPetType(id: string) {
  try {
    return await (
      await server()
    ).get<JsonResponse<PetType>>(`/admin/pet-types/${id}`);
  } catch (error) {
    return null;
  }
}
