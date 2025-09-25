import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PetTypesClient } from "../../../clients/pet-types.client";

export function usePetTypesListScreenState() {
  const searchParams = useSearchParams().toString();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list-pet-types", searchParams],
    queryFn: PetTypesClient.getPetTypes,
  });

  return {
    data: data?.data?.data || [],
    pagination: data?.data?.pagination,
    isLoading,
    isError,
  };
}
