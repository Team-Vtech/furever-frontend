import { client } from "@/app/shared/utils/http.client.utils";
import { ENDPOINTS } from "../constant";
import { Addon, CreateAddonData, UpdateAddonData } from "../types/index";
import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";

interface GetAddonsParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
}

export const AddonsClient = {
  async getAddons(params: GetAddonsParams = {}) {
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
        data: Addon[];
      }>
    >(`${ENDPOINTS.getAddons.url}?${searchParams.toString()}`);
    return response.data;
  },

  async getAddon(id: string) {
    const response = await client().get<JsonResponse<Addon>>(
      `${ENDPOINTS.getAddons.url}/${id}`
    );
    return response.data;
  },

  async createAddon(data: CreateAddonData) {
    const response = await client().post<JsonResponse<Addon>>(
      ENDPOINTS.createAddon.url,
      data
    );
    return response.data;
  },

  async updateAddon(id: string, data: UpdateAddonData) {
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
