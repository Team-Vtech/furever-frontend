import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PetsClient } from "../clients/pets.client";
import { PetFormValues } from "../schemas/pet.schema";

const QUERY_KEYS = {
    pets: ["pets"] as const,
    pet: (id: string | number) => ["pets", id] as const,
};

export function usePetsQuery() {
    return useQuery({
        queryKey: QUERY_KEYS.pets,
        queryFn: async () => {
            const response = await PetsClient.getPets();
            return response.data;
        },
    });
}

export function usePetQuery(id: string | number) {
    return useQuery({
        queryKey: QUERY_KEYS.pet(id),
        queryFn: async () => {
            const response = await PetsClient.getPet(id);
            return response.data;
        },
        enabled: !!id,
    });
}

export function useCreatePetMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: PetFormValues) => {
            const response = await PetsClient.createPet(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets });
        },
    });
}

export function useUpdatePetMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string | number; data: PetFormValues }) => {
            const response = await PetsClient.updatePet(id, data);
            return response.data;
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pet(id) });
        },
    });
}

export function useDeletePetMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string | number) => {
            const response = await PetsClient.deletePet(id);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets });
        },
    });
}
