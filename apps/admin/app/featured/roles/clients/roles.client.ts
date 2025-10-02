import { client } from "@/app/shared/utils/http.client.utils";
import { Role } from "@furever/types";
import { JsonResponse, PaginatedJsonResponse } from "@furever/types/general";
import { RoleFormValues } from "../../../(routes)/api/roles/roles.schema";
import { ENDPOINTS } from "../constants";

export const RolesClient = {
    async getRoles({ queryKey }: { queryKey: [string, string] }) {
        const response = await client().get<
            PaginatedJsonResponse<{
                data: Role[];
            }>
        >(ENDPOINTS.getRoles.url, {
            params: new URLSearchParams(queryKey[1]),
        });
        return response.data;
    },

    async getRole(id: string) {
        const response = await client().get<JsonResponse<Role>>(ENDPOINTS.getRole.url(id));
        return response.data;
    },

    async createRole(data: RoleFormValues) {
        const response = await client().post<JsonResponse<Role>>(ENDPOINTS.createRole.url, data);
        return response.data;
    },

    async updateRole({ id, data }: { id: number; data: RoleFormValues }) {
        const response = await client().patch<JsonResponse<Role>>(`${ENDPOINTS.getRoles.url}/${id}`, data);
        return response.data;
    },

    async deleteRole(id: number) {
        const response = await client().delete<JsonResponse<void>>(`${ENDPOINTS.getRoles.url}/${id}`);
        return response.data;
    },
};
