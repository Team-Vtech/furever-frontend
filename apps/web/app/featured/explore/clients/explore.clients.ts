import { client } from "@/app/shared/utils/http.client.utils";
import { Service, JsonResponse } from "@furever/types";

export const ExploreClients = {
  async getPopularService() {
    return await client().get<JsonResponse<Service[]>>(
      "/api/user/services/popular"
    );
  },
  async getServiceDetails(serviceId: string) {
    return await client().get<JsonResponse<Service[]>>(
      `/api/user/services/${serviceId}`
    );
  },
};
