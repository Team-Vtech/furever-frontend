import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PetTypeFormValues } from "../../../(routes)/api/pet-types/schema";
import { GetPetTypesParams, PetTypesClient } from "../clients/pet-types.client";

const QUERY_KEYS = {
    petTypes: ["pet-types"] as const,
    petType: (id: string) => ["pet-types", id] as const,
};

export function usePetTypesQuery(params: GetPetTypesParams = {}) {
    return useQuery({
        queryKey: [...QUERY_KEYS.petTypes, params],
        queryFn: () => PetTypesClient.getPetTypesWithParams(params),
    });
}

export function usePetTypeQuery(id: string) {
    return useQuery({
        queryKey: QUERY_KEYS.petType(id),
        queryFn: () => PetTypesClient.getPetType(id),
        enabled: !!id,
    });
}

export function useCreatePetTypeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PetTypeFormValues) => PetTypesClient.createPetType(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.petTypes });
            toastUtils.success.create("Pet type");
        },
        onError: () => {
            toastUtils.error.create("Pet type");
        },
    });
}

export function useUpdatePetTypeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: PetTypeFormValues }) => PetTypesClient.updatePetType(id.toString(), data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.petTypes });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.petType(id.toString()),
            });
            toastUtils.success.update("Pet type updated successfully");
        },
        onError: () => {
            toastUtils.error.update("Pet type");
        },
    });
}

export function useDeletePetTypeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) => PetTypesClient.deletePetType(id.toString()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.petTypes });
            toastUtils.success.delete("Pet type deleted successfully");
        },
        onError: () => {
            toastUtils.error.delete("Pet type");
        },
    });
}
