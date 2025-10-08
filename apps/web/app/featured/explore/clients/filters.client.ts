import { client } from "@/app/shared/utils/http.client.utils";

export interface Location {
    id: string;
    name: string;
    city: string;
    state?: string;
    country?: string;
}

export interface ServiceType {
    id: string;
    name: string;
    description?: string;
}

export class FiltersClient {
    async getLocations(): Promise<Location[]> {
        try {
            const response = await client().get("/api/locations");
            return response.data || [];
        } catch (error) {
            console.error("Failed to fetch locations:", error);
            return [];
        }
    }

    async getServiceTypes(): Promise<ServiceType[]> {
        try {
            const response = await client().get("/api/service-types");
            return response.data || [];
        } catch (error) {
            console.error("Failed to fetch service types:", error);
            return [];
        }
    }
}

export const filtersClient = new FiltersClient();