import { client } from "@/app/shared/utils/http.client.utils";
import { City, JsonResponse, PetType, Service, ServiceType, State } from "@furever/types";

export const ExploreClients = {
    async getPopularService() {
        return await client().get<JsonResponse<Service[]>>("/api/user/services/popular");
    },
    async getServiceDetails(serviceId: string) {
        return await client().get<JsonResponse<Service[]>>(`/api/user/services/${serviceId}`);
    },
    async getFilters({ queryKey }: { queryKey: string[] }) {
        return await client().get<
            JsonResponse<{
                service_types: ServiceType[];
                pet_types: PetType[];
                locations: {
                    cities: City[];
                    states: State[];
                };
            }>
        >("/api/explore-filters", {
            params: new URLSearchParams(queryKey[1]),
        });
    },
};
