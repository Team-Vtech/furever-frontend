import { AddonFormValues } from "@/app/(routes)/api/addons/addons.schema";
import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";
import { client } from "@/app/shared/utils/http.client.utils";
import { ENDPOINTS } from "../constant";
import { Addon } from "@furever/types/index";

export const AddonsClient = {
  async getAddons({ queryKey }: { queryKey: string[] }) {
    const [_key, ...params] = queryKey;

    const response = await client().get<
      PaginatedJsonResponse<{
        data: Addon[];
      }>
    >(ENDPOINTS.getAddons.url, {
      params,
    });
    return response.data;
  },

  async getAddon(id: string) {
    const response = await client().get<JsonResponse<Addon>>(
      `${ENDPOINTS.getAddons.url}/${id}`
    );
    return response.data;
  },

  async createAddon(data: AddonFormValues) {
    const response = await client().post<JsonResponse<Addon>>(
      ENDPOINTS.createAddon.url,
      data
    );
    return response.data;
  },

  async updateAddon({ id, data }: { id: number; data: AddonFormValues }) {
    const response = await client().put<JsonResponse<Addon>>(
      `${ENDPOINTS.getAddons.url}/${id}`,
      data
    );
    return response.data;
  },

  async deleteAddon(id: number) {
    const response = await client().delete<JsonResponse<void>>(
      `${ENDPOINTS.getAddons.url}/${id}`
    );
    return response.data;
  },
};
