import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PetsClient } from "../clients/pets.client";
import { PetFormValues } from "../schemas/pet.schema";

export function useCreatePetMutation() {
    const router = useRouter();
    const { mutateAsync: createPet, isPending: isCreating } = useMutation({
        mutationFn: async (data: PetFormValues) => {
            const response = await PetsClient.createPet(data);
            return response.data;
        },
        onSuccess: () => {
            toastUtils.success.create("Pet");
            router.refresh();
        },
        onError: () => {
            toastUtils.error.create("Pet");
        },
    });
    return { createPet, isCreating };
}

export function useUpdatePetMutation() {
    const router = useRouter();
    const { mutateAsync: updatePet, isPending: isUpdating } = useMutation({
        mutationFn: async ({ id, data }: { id: string | number; data: PetFormValues }) => {
            const response = await PetsClient.updatePet(id, data);
            return response.data;
        },
        onSuccess: () => {
            toastUtils.success.update("Pet");
            router.refresh();
        },
        onError: () => {
            toastUtils.error.update("Pet");
        },
    });
    return { updatePet, isUpdating };
}

export function useDeletePetMutation() {
    const router = useRouter();
    const { mutateAsync: deletePet, isPending: isDeleting } = useMutation({
        mutationFn: async (id: string | number) => {
            const response = await PetsClient.deletePet(id);
            return response.data;
        },
        onSuccess: () => {
            toastUtils.success.delete("Pet");
            router.refresh();
        },
        onError: () => {
            toastUtils.error.delete("Pet");
        },
    });
    return { deletePet, isDeleting };
}
