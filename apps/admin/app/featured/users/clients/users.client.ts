import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse, PaginatedJsonResponse, Pet, User } from "@furever/types";
import { UserFormValues } from "../../../(routes)/api/users/users.schema";
import { ENDPOINTS } from "../constant";

export const UsersClient = {
    async getUsers({ queryKey }: { queryKey: string[] }) {
        const response = await client().get<
            PaginatedJsonResponse<{
                data: User[];
            }>
        >(ENDPOINTS.getUsers.url, {
            params: new URLSearchParams(queryKey[1]),
        });
        return response.data;
    },

    async getUser(id: string) {
        const response = await client().get<JsonResponse<User>>(`${ENDPOINTS.getUsers.url}/${id}`);
        return response.data;
    },

    async createUser(data: UserFormValues) {
        const response = await client().post<JsonResponse<User>>(ENDPOINTS.createUser.url, data);
        return response.data;
    },

    async updateUser({ id, data }: { id: number; data: UserFormValues }) {
        const response = await client().put<JsonResponse<User>>(`${ENDPOINTS.getUsers.url}/${id}`, data);
        return response.data;
    },

    async deleteUser(id: number) {
        const response = await client().delete<JsonResponse<void>>(`${ENDPOINTS.getUsers.url}/${id}`);
        return response.data;
    },

    async getUserPets(id: number) {
        const response = await client().get<
            PaginatedJsonResponse<{
                data: Pet[];
            }>
        >(`${ENDPOINTS.getUsers.url}/${id}/pets`);
        return response.data;
    },
};
