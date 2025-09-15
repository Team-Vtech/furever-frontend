"use client";

import { PetTypeFormValues } from "@/app/(admin)/admin/(routes)/api/pet-types/schema";
import { PetTypeForm } from "../../containers/PetTypeForm";
import {
  useCreatePetTypeMutation,
  useUpdatePetTypeMutation,
} from "../../hooks/use-pet-types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PetType } from "../../types";

type EditPetTypeScreenProps = {
  petType: PetType;
};

export default function EditPetTypeScreen({ petType }: EditPetTypeScreenProps) {
  const router = useRouter();
  const updateMutation = useUpdatePetTypeMutation();

  const handleSubmit = async (data: PetTypeFormValues) => {
    try {
      await updateMutation.mutateAsync({ id: petType.id, ...data });
      toast.success("Pet type updated successfully");
      router.push("/admin/pet-types");
    } catch (error) {
      toast.error("Failed to update pet type");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PetTypeForm
        onSubmit={handleSubmit}
        isLoading={updateMutation.isPending}
        petType={petType}
      />
    </div>
  );
}
