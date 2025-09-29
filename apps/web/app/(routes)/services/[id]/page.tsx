import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, Service } from "@furever/types";
import { Suspense } from "react";
import { ServiceDetailsScreen } from "../../../featured/services/screens/ServiceDetailsScreen";

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
