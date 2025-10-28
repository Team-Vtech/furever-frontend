import { AddonFormValues } from "@/app/(routes)/api/addons/addons.schema";

import { client } from "@/app/shared/utils/http.client.utils";
import { Addon, JsonResponse, PaginatedJsonResponse } from "@furever/types";
import { ENDPOINTS } from "../constants";

export const AddonsClient = {
    async getAddons({ queryKey }: { queryKey: string[] }) {
        const response = await client().get<
            PaginatedJsonResponse<{
                data: Addon[];
            }>
        >(ENDPOINTS.getAddons.url, {
            params: new URLSearchParams(queryKey[1]),
        });
        return response.data;
    },

    async getAddon(id: string) {
        const response = await client().get<JsonResponse<Addon>>(`${ENDPOINTS.getAddons.url}/${id}`);
        return response.data;
    },

    async createAddon(data: AddonFormValues) {
        const response = await client().post<JsonResponse<Addon>>(ENDPOINTS.createAddon.url, data);
        return response.data;
    },

    async updateAddon({ id, data }: { id: number; data: AddonFormValues }) {
        const response = await client().put<JsonResponse<Addon>>(`${ENDPOINTS.getAddons.url}/${id}`, data);
        return response.data;
    },

    async deleteAddon(id: number) {
        const response = await client().delete<JsonResponse<void>>(`${ENDPOINTS.getAddons.url}/${id}`);
        return response.data;
    },
};
