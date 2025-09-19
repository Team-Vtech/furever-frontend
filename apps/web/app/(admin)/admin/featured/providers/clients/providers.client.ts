import { client } from "@/app/shared/utils/http.client.utils";
import { ENDPOINTS } from "../constant";
import {
  Provider,
  CreateProviderData,
  UpdateProviderData,
} from "../types/index";
import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";

interface GetProvidersParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
}

export const ProvidersClient = {
  async getProviders(params: GetProvidersParams = {}) {
    const { page = 1, per_page = 10, search, status } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: per_page.toString(),
    });

    if (search) {
      searchParams.append("search", search);
    }
    if (status) {
      searchParams.append("status", status);
    }

    const response = await client().get<
      PaginatedJsonResponse<{
        data: Provider[];
      }>
    >(`${ENDPOINTS.getProviders.url}?${searchParams.toString()}`);
    return response.data;
  },

  async getProvider(id: string) {
    const response = await client().get<JsonResponse<Provider>>(
      `${ENDPOINTS.getProviders.url}/${id}`
    );
    return response.data;
  },

  async createProvider(data: CreateProviderData) {
    const response = await client().post<JsonResponse<Provider>>(
      ENDPOINTS.createProvider.url,
      data
    );
    return response.data;
  },

  async updateProvider(id: string, data: UpdateProviderData) {
    const response = await client().put<JsonResponse<Provider>>(
      `${ENDPOINTS.getProviders.url}/${id}`,
      data
    );
    return response.data;
  },

  async deleteProvider(id: number) {
    const response = await client().delete<JsonResponse<void>>(
      `${ENDPOINTS.getProviders.url}/${id}`
    );
    return response.data;
  },
};
