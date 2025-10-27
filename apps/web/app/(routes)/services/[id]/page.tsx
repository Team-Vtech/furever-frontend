import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, Service } from "@furever/types";
import { Metadata } from "next";
import { Suspense } from "react";
import { ServiceDetailsScreen } from "../../../featured/services/screens/ServiceDetailsScreen";

export const metadata: Metadata = {
    title: "Service Details | Furever",
    description: "View detailed information about pet care services, pricing, and book appointments with service providers.",
};

interface ServiceDetailsPageProps {
    params: Promise<{
        id: number;
    }>;
}

export default async function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
    const { id } = await params;

    const service = await getServiceById(id);

    if (!service) {
        return <div>Service not found</div>;
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ServiceDetailsScreen service={service.data.data} />
        </Suspense>
    );
}

async function getServiceById(id: number) {
    return await (await server()).get<JsonResponse<Service>>(`/user/services/${id}`);
}
