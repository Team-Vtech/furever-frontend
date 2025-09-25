import {
  JsonResponse,
  PaginatedJsonResponse,
} from "@/app/shared/types/general";
import { client } from "@/app/shared/utils/http.client.utils";
import {
  CreatePermissionRequest,
  UpdatePermissionRequest,
} from "../../../(routes)/api/permissions/permissions.schema";
import { Permission } from "../types/index";
import { ENDPOINTS } from "../constants";

export const PermissionsClient = {
  async getPermissions({ queryKey }: { queryKey: [string, string] }) {
    const response = await client().get<
      PaginatedJsonResponse<{
        data: Permission[];
      }>
    >(ENDPOINTS.getPermissions.url, {
      params: queryKey[1],
    });
    return response.data;
  },

  async getPermission(id: string) {
    const response = await client().get<JsonResponse<Permission>>(
      ENDPOINTS.getPermission.url(id)
    );
    return response.data;
  },

  async createPermission(data: CreatePermissionRequest) {
    const response = await client().post<JsonResponse<Permission>>(
      ENDPOINTS.createPermission.url,
      data
    );
    return response.data;
  },

  async updatePermission({
    id,
    data,
  }: {
    id: number;
    data: UpdatePermissionRequest;
  }) {
    const response = await client().patch<JsonResponse<Permission>>(
      `${ENDPOINTS.getPermissions.url}/${id}`,
      data
    );
    return response.data;
  },

  async deletePermission(id: number) {
    const response = await client().delete<JsonResponse<void>>(
      `${ENDPOINTS.getPermissions.url}/${id}`
    );
    return response.data;
  },
};
