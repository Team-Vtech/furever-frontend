"use client";

import { PetTypeFormValues } from "@/app/(admin)/(routes)/api/pet-types/schema";
import { PetTypeForm } from "../../containers/PetTypeForm";
import { useCreatePetTypeMutation } from "../../hooks/use-pet-types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreatePetTypeScreen() {
  const router = useRouter();
  const createMutation = useCreatePetTypeMutation();

  const handleSubmit = async (data: PetTypeFormValues) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Pet type created successfully");
      router.push("/pet-types");
    } catch (error) {
      toast.error("Failed to create pet type");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PetTypeForm
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}
