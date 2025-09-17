import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PetTypesClient, GetPetTypesParams } from "../clients/pet-types.client";
import { PetType } from "../types";
import { PetTypeFormValues } from "../../../(routes)/api/pet-types/schema";
import { toast } from "sonner";

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
      toast.success("Pet type created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create pet type");
    },
  });
}

export function useUpdatePetTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | number;
      data: PetTypeFormValues;
    }) => PetTypesClient.updatePetType(id.toString(), data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.petTypes });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.petType(id.toString()),
      });
      toast.success("Pet type updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update pet type");
    },
  });
}

export function useDeletePetTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) =>
      PetTypesClient.deletePetType(id.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.petTypes });
      toast.success("Pet type deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete pet type");
    },
  });
}
