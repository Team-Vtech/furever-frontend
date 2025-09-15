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
      <PageLayout
        title={`Edit Pet Type: ${petType.data?.name || ""}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Pet Types", href: "/admin/pet-types" },
          { label: "Edit Pet Type", href: `/admin/pet-types/${id}/edit` },
        ]}
      >
        <EditPetTypeScreen petType={petType.data} />
      </PageLayout>
    </Suspense>
  );
}

async function getPetType(id: string) {
  return await PetTypesClient.getPetType(id);
}
