import { client } from "@/app/shared/utils/http.client.utils";
import { PaginatedJsonResponse, Provider } from "@furever/types";

const http = client();

export type GetProvidersParams = {
    page?: number;
    limit?: number;
    search?: string;
    service_type?: string;
    location?: string;
};

export const ProvidersClient = {
    async getProviders({queryKey}: {queryKey: string[]}) {
        return await client().get<PaginatedJsonResponse<{
            data: Provider[]
        }>>("/api/providers", {
            params: new URLSearchParams(queryKey[1])
        });
    },

    async getProvider(id: string | number) {
        return http.get<{ data: Provider }>(`/api/providers/${id}`);
    },
};