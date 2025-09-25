import { Service } from "@/app/(admin)/admin/featured/services/types";
import { JsonResponse } from "@/app/shared/types/general";
import { client } from "@/app/shared/utils/http.client.utils";
import { getServiceDetails } from "../../services/clients/services.client";

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
