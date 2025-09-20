import { client } from "@/app/shared/utils/http.client.utils";
import { ENDPOINTS } from "../constant";

import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";
import { Provider } from "../../../shared/types/models.types";
import { ProviderFormValues } from "../../../(routes)/api/providers/providers.schema";

export const ProvidersClient = {
  async getProviders({ queryKey }: { queryKey: [string, string] }) {
    const response = await client().get<
      PaginatedJsonResponse<{
        data: Provider[];
      }>
    >(ENDPOINTS.getProviders.url, {
      params: queryKey[1],
    });
    return response.data;
  },

  async getProvider(id: string) {
    const response = await client().get<JsonResponse<Provider>>(
      `${ENDPOINTS.getProviders.url}/${id}`
    );
    return response.data;
  },

  async createProvider(data: ProviderFormValues) {
    const response = await client().post<JsonResponse<Provider>>(
      ENDPOINTS.createProvider.url,
      data
    );
    return response.data;
  },

  async updateProvider(id: string, data: ProviderFormValues) {
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
