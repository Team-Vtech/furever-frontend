import { client } from "@/app/shared/utils/http.client.utils";
import { ENDPOINTS } from "../constant";
import {
  ServiceType,
  CreateServiceTypeData,
  UpdateServiceTypeData,
  GetServiceTypesParams,
} from "../types/index";
import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";

export const ServiceTypesClient = {
  async getServiceTypes(params: GetServiceTypesParams = {}) {
    const { page = 1, limit = 10, search, status } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      searchParams.append("search", search);
    }
    if (status) {
      searchParams.append("status", status);
    }

    const response = await client().get<
      PaginatedJsonResponse<{
        data: ServiceType[];
      }>
    >(`${ENDPOINTS.getServiceTypes.url}?${searchParams.toString()}`);
    return response.data;
  },

  async getServiceType(id: string) {
    const response = await client().get<JsonResponse<ServiceType>>(
      ENDPOINTS.getServiceType.url(id)
    );
    return response.data;
  },

  async createServiceType(data: CreateServiceTypeData) {
    const response = await client().post<JsonResponse<ServiceType>>(
      ENDPOINTS.createServiceType.url,
      data
    );
    return response.data;
  },

  async updateServiceType(id: string, data: UpdateServiceTypeData) {
    const response = await client().put<JsonResponse<ServiceType>>(
      ENDPOINTS.updateServiceType.url(id),
      data
    );
    return response.data;
  },

  async deleteServiceType(id: string) {
    const response = await client().delete<JsonResponse<void>>(
      ENDPOINTS.deleteServiceType.url(id)
    );
    return response.data;
  },
};
