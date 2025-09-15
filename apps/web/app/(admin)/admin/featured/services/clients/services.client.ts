import { client } from "@/app/shared/utils/http.client.utils";
import { ENDPOINTS } from "../constant";
import { Service } from "../types/index";
import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";
import { CreateServiceSchema } from "../../../(routes)/api/services/schema";
import { z } from "zod";

type CreateServiceInput = z.infer<typeof CreateServiceSchema>;
type UpdateServiceInput = Partial<CreateServiceInput>;

interface GetServicesParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  category?: string;
}

export const ServicesClient = {
  async getServices(params: GetServicesParams = {}) {
    const { page = 1, per_page = 10, search, status, category } = params;

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
    if (category) {
      searchParams.append("category", category);
    }

    const response = await client().get<
      PaginatedJsonResponse<{
        data: Service[];
      }>
    >(`${ENDPOINTS.getServices.url}?${searchParams.toString()}`);
    return response.data;
  },

  async getService(id: string) {
    const response = await client().get<JsonResponse<Service>>(
      `${ENDPOINTS.getServices.url}/${id}`
    );
    return response.data;
  },

  async createService(data: CreateServiceInput) {
    const response = await client().post<JsonResponse<Service>>(
      ENDPOINTS.getServices.url,
      data
    );
    return response.data;
  },

  async updateService(id: string, data: UpdateServiceInput) {
    const response = await client().put<JsonResponse<Service>>(
      `${ENDPOINTS.getServices.url}/${id}`,
      data
    );
    return response.data;
  },

  async deleteService(id: string) {
    const response = await client().delete<JsonResponse<void>>(
      `${ENDPOINTS.getServices.url}/${id}`
    );
    return response.data;
  },
};
