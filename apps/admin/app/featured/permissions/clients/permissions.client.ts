import { PermissionFormValues } from "@/app/(routes)/api/permissions/permissions.schema";
import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse, PaginatedJsonResponse, Permission } from "@furever/types";
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
        const response = await client().get<JsonResponse<Permission>>(ENDPOINTS.getPermission.url(id));
        return response.data;
    },

    async createPermission(data: PermissionFormValues) {
        const response = await client().post<JsonResponse<Permission>>(ENDPOINTS.createPermission.url, data);
        return response.data;
    },

    async updatePermission({ id, data }: { id: number; data: PermissionFormValues }) {
        const response = await client().patch<JsonResponse<Permission>>(`${ENDPOINTS.getPermissions.url}/${id}`, data);
        return response.data;
    },

    async deletePermission(id: number) {
        const response = await client().delete<JsonResponse<void>>(`${ENDPOINTS.getPermissions.url}/${id}`);
        return response.data;
    },
};
