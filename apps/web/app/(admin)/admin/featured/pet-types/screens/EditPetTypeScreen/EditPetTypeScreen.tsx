"use client";

import { PetTypeFormValues } from "@/app/(admin)/admin/(routes)/api/pet-types/schema";
import { PetTypeForm } from "../../containers/PetTypeForm";
import {
  useCreatePetTypeMutation,
  useDeletePetTypeMutation,
  useUpdatePetTypeMutation,
} from "../../hooks/use-pet-types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PetType } from "../../types";
import { PageLayout } from "@/app/(admin)/admin/shared/components/PageLayout/PageLayout";
import { DeleteRecordDialog } from "@/app/(admin)/admin/shared/components/DeleteRecordDialog/DeleteRecordDialog";

type EditPetTypeScreenProps = {
  petType: PetType;
};

export default function EditPetTypeScreen({ petType }: EditPetTypeScreenProps) {
  const router = useRouter();
  const updateMutation = useUpdatePetTypeMutation();
  const deletePetType = useDeletePetTypeMutation();

  const handleSubmit = async (data: PetTypeFormValues) => {
    try {
      await updateMutation.mutateAsync({
        id: petType.id,
        data,
      });
      toast.success("Pet type updated successfully");
      router.push("/admin/pet-types");
    } catch (error) {
      toast.error("Failed to update pet type");
    }
  };

  return (
    <PageLayout
      title={`Edit Pet Type: ${petType?.name || ""}`}
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Pet Types", href: "/admin/pet-types" },
        {
          label: "Edit Pet Type",
          href: `/admin/pet-types/${petType?.id}/edit`,
        },
      ]}
      actions={
        <DeleteRecordDialog
          isDeleting={deletePetType.isPending}
          onDelete={async () => {
            try {
              await deletePetType.mutateAsync(petType.id);
              toast.success("Pet type deleted successfully");
              router.push("/admin/pet-types");
            } catch (error) {
              toast.error("Failed to delete pet type");
            }
          }}
          recordId={petType.id}
          recordName={petType.name}
        />
      }
    >
      <div className="container mx-auto px-4 py-8">
        <PetTypeForm
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          petType={petType}
        />
      </div>
    </PageLayout>
  );
}
