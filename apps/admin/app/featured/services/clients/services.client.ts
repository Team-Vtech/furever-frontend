import { client } from "@/app/shared/utils/http.client.utils";
import { ENDPOINTS } from "../constant";
import { ServiceFormValues } from "../../../(routes)/api/services/services.schema";
import { JsonResponse, PaginatedJsonResponse, Service } from "@furever/types";

export const ServicesClient = {
  async getServices({ queryKey }: { queryKey: string[] }) {
    const response = await client().get<
      PaginatedJsonResponse<{
        data: Service[];
      }>
    >(ENDPOINTS.getServices.url, {
      params: new URLSearchParams(queryKey[1]),
    });
    return response.data;
  },

  async getService(id: string) {
    const response = await client().get<JsonResponse<Service>>(
      `${ENDPOINTS.getServices.url}/${id}`
    );
    return response.data;
  },

  async createService(data: ServiceFormValues) {
    const response = await client().post<JsonResponse<Service>>(
      ENDPOINTS.getServices.url,
      data
    );
    return response.data;
  },

  async updateService(id: number, data: ServiceFormValues) {
    const response = await client().patch<JsonResponse<Service>>(
      `${ENDPOINTS.getServices.url}/${id}`,
      data
    );
    return response.data;
  },

  async deleteService(id: number) {
    const response = await client().delete<JsonResponse<void>>(
      `${ENDPOINTS.getServices.url}/${id}`
    );
    return response.data;
  },
};
