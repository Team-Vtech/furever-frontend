import { client } from "@/app/shared/utils/http.client.utils";
import { ENDPOINTS } from "../constant";

import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";
import { ProviderFormValues } from "../../../(routes)/api/providers/providers.schema";
import { Provider } from "@furever/types";

export const ProvidersClient = {
  async getProviders({ queryKey }: { queryKey: string[] }) {
    const response = await client().get<
      PaginatedJsonResponse<{
        data: Provider[];
      }>
    >(ENDPOINTS.getProviders.url, {
      params: new URLSearchParams(queryKey[1]),
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
