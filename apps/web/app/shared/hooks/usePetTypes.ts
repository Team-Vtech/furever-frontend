import { useQuery } from "@tanstack/react-query";
import { petTypesClient } from "../clients/pet-types.client";


const QUERY_KEYS = {
  petTypes: ["shared", "pet-types"] as const,
};

export function usePetTypes() {
  return useQuery({
    queryKey: QUERY_KEYS.petTypes,
    queryFn: () => petTypesClient.getPetTypes(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}