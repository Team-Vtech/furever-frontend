import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PetTypeFormValues } from "../../../(routes)/api/pet-types/schema";
import { PetTypesClient } from "../clients/pet-types.client";

export function useCreatePetTypeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PetTypeFormValues) => PetTypesClient.createPetType(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pet-types"] });
        },
    });
}

export function useUpdatePetTypeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: PetTypeFormValues }) => PetTypesClient.updatePetType(id.toString(), data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["pet-types"] });
            queryClient.invalidateQueries({ queryKey: ["pet-types", id] });
        },
    });
}

export function useDeletePetTypeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) => PetTypesClient.deletePetType(id.toString()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pet-types"] });
        },
    });
}
