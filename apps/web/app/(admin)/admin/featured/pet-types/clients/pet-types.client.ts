import { client } from "@/app/shared/utils/http.client.utils";
import { ENDPOINTS } from "../constants";
import { PetType } from "../types/index";
import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";
import { z } from "zod";
import { PetTypeFormValues } from "../../../(routes)/api/pet-types/schema";

export const PetTypesClient = {
  async getPetTypes({ queryKey }: { queryKey: string[] }) {
    const response = await client().get<
      PaginatedJsonResponse<{
        data: PetType[];
      }>
    >(ENDPOINTS.getPetTypes.url, {
      params: queryKey[1],
    });
    return response.data;
  },

  async getPetType(id: string) {
    const response = await client().get<JsonResponse<PetType>>(
      `${ENDPOINTS.getPetTypes.url}/${id}`
    );
    return response.data;
  },

  async createPetType(data: PetTypeFormValues) {
    const response = await client().post<JsonResponse<PetType>>(
      ENDPOINTS.getPetTypes.url,
      data
    );
    return response.data;
  },

  async updatePetType(id: string, data: PetTypeFormValues) {
    const response = await client().put<JsonResponse<PetType>>(
      `${ENDPOINTS.getPetTypes.url}/${id}`,
      data
    );
    return response.data;
  },

  async deletePetType(id: string) {
    const response = await client().delete<JsonResponse<void>>(
      `${ENDPOINTS.getPetTypes.url}/${id}`
    );
    return response.data;
  },
};
