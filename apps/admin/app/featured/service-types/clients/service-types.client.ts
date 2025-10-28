import { ServiceTypeFormValues } from "@/app/(routes)/api/service-types/schema";
import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse, PaginatedJsonResponse } from "@furever/types/general";
import { ServiceType } from "@furever/types/index";
import { ENDPOINTS } from "../constants";

export const ServiceTypesClient = {
    async getServiceTypes({ queryKey }: { queryKey: string[] }) {
        const [, searchParams] = queryKey;

        const response = await client().get<
            PaginatedJsonResponse<{
                data: ServiceType[];
            }>
        >(ENDPOINTS.getServiceTypes.url, {
            params: new URLSearchParams(searchParams),
        });
        return response.data;
    },

    async getServiceType(id: number) {
        const response = await client().get<JsonResponse<ServiceType>>(ENDPOINTS.getServiceType.url(id));
        return response.data;
    },

    async createServiceType(data: ServiceTypeFormValues) {
        const response = await client().post<JsonResponse<ServiceType>>(ENDPOINTS.createServiceType.url, data);
        return response.data;
    },

    async updateServiceType({ id, data }: { id: number; data: ServiceTypeFormValues }) {
        const response = await client().put<JsonResponse<ServiceType>>(ENDPOINTS.updateServiceType.url(id), data);
        return response.data;
    },

    async deleteServiceType(id: number) {
        const response = await client().delete<JsonResponse<void>>(ENDPOINTS.deleteServiceType.url(id));
        return response.data;
    },
};
