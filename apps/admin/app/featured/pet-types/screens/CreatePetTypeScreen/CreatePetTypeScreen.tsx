"use client";

import { PetTypeFormValues } from "@/app/(routes)/api/pet-types/schema";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useRouter } from "next/navigation";
import { PetTypeForm } from "../../containers/PetTypeForm";
import { useCreatePetTypeMutation } from "../../hooks/use-pet-types";

export default function CreatePetTypeScreen() {
    const router = useRouter();
    const createMutation = useCreatePetTypeMutation();

    const handleSubmit = async (data: PetTypeFormValues) => {
        try {
            await createMutation.mutateAsync(data);
            toastUtils.success.create("Pet type created successfully");
            router.push("/pet-types");
        } catch {
            toastUtils.error.create("Failed to create pet type");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <PetTypeForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
        </div>
    );
}
