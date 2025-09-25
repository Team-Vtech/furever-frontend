import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";
import { client } from "@/app/shared/utils/http.client.utils";
import { UserFormValues } from "../../../(routes)/api/users/users.schema";
import { ENDPOINTS } from "../constant";
import { User } from "../types/index";

interface GetUsersParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
}

export const UsersClient = {
  async getUsers({ queryKey }: { queryKey: string[] }) {
    const response = await client().get<
      PaginatedJsonResponse<{
        data: User[];
      }>
    >(ENDPOINTS.getUsers.url, {
      params: new URLSearchParams(queryKey[1]) ?? "",
    });
    return response.data;
  },

  async getUser(id: string) {
    const response = await client().get<JsonResponse<User>>(
      `${ENDPOINTS.getUsers.url}/${id}`
    );
    return response.data;
  },

  async createUser(data: UserFormValues) {
    const response = await client().post<JsonResponse<User>>(
      ENDPOINTS.createUser.url,
      data
    );
    return response.data;
  },

  async updateUser({ id, data }: { id: number; data: UserFormValues }) {
    const response = await client().put<JsonResponse<User>>(
      `${ENDPOINTS.getUsers.url}/${id}`,
      data
    );
    return response.data;
  },

  async deleteUser(id: number) {
    const response = await client().delete<JsonResponse<void>>(
      `${ENDPOINTS.getUsers.url}/${id}`
    );
    return response.data;
  },
};
