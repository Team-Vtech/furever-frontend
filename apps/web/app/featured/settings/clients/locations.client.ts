import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse, UserSettingsLocation } from "@furever/types";
import { LocationFormValues } from "../../../(routes)/api/locations/locations.schema";
import { ENDPOINTS } from "../constants";

export const LocationsClient = {
    async getLocations({ queryKey }: { queryKey: string[] }) {
        const response = await client().get<JsonResponse<UserSettingsLocation[]>>(ENDPOINTS.getLocations.url, {
            params: new URLSearchParams(queryKey[1]),
        });
        return response.data;
    },

    async getLocation(id: string) {
        const response = await client().get<JsonResponse<UserSettingsLocation>>(`${ENDPOINTS.getLocations.url}/${id}`);
        return response.data;
    },

    async createLocation(data: LocationFormValues) {
        const response = await client().post<JsonResponse<UserSettingsLocation>>(ENDPOINTS.createLocation.url, data);
        return response.data;
    },

    async updateLocation({ id, data }: { id: number; data: Partial<LocationFormValues> }) {
        const response = await client().put<JsonResponse<UserSettingsLocation>>(`${ENDPOINTS.getLocations.url}/${id}`, data);
        return response.data;
    },

    async deleteLocation(id: number) {
        const response = await client().delete<JsonResponse<void>>(`${ENDPOINTS.getLocations.url}/${id}`);
        return response.data;
    },
};
