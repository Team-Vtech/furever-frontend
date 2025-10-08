import { useQuery } from "@tanstack/react-query";
import { ExploreClients } from "../../explore/clients/explore.clients";

export function usePetTypesAndBreedsQuery() {
    return useQuery({
        queryKey: ["pet-types-and-breeds"],
        queryFn: ExploreClients.getFilters,
        select: (data) => ({
            petTypes: data.data.data.pet_types || [],
            petBreeds: data.data.data.pet_types?.flatMap(type => 
                type.pet_breeds?.map(breed => ({
                    ...breed,
                    pet_type_id: type.id
                })) || []
            ) || [],
        }),
    });
}