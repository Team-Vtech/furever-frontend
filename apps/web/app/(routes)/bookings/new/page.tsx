import { NewBookingScreen } from "@/app/featured/bookings/screens/NewBookingScreen/NewBookingScreen";
import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, Provider, Service } from "@furever/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Service | Furever",
    description: "Book a pet care service with trusted professionals. Schedule appointments for your furry friends.",
};

export default async function NewBookingPage({ searchParams }: { searchParams: Promise<{ provider_id?: number; service_id?: number }> }) {
    const { provider_id, service_id } = await searchParams;
    let provider: Provider | null = null;
    let service: Service | null = null;
    if (provider_id) {
        provider = await getProvider(provider_id.toString());
        if (!provider) {
            return <div className="p-4">Provider not found.</div>;
        }
    }
    if (service_id) {
        service = await getService(service_id.toString());
        if (!service) {
            return <div className="p-4">Service not found.</div>;
        }
    }

    return <NewBookingScreen provider={provider} service={service} />;
}

async function getProvider(id: string): Promise<Provider | null> {
    try {
        const response = await (await server()).get<JsonResponse<Provider>>(`/providers/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch provider:", error);
        return null;
    }
}

async function getService(id: string): Promise<Service | null> {
    try {
        const response = await (await server()).get<JsonResponse<Service>>(`/services/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch service:", error);
        return null;
    }
}
