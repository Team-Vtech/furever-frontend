import { useQuery } from "@tanstack/react-query";
import { PetsClient } from "../clients/pets.client";

const QUERY_KEYS = {
    pets: ["pets"] as const,
} as const;

export function usePetsQuery() {
    const { data, isLoading, error } = useQuery({
        queryKey: QUERY_KEYS.pets,
        queryFn: PetsClient.getPets,
        select: (data) => data.data,
    });

    return { pets: data, isLoading, error };
}
