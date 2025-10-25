import { server } from "@/app/shared/utils/http.server.utils";
import { Certificate, JsonResponse, Provider } from "@furever/types";
import { notFound } from "next/navigation";
import { EditProviderScreen } from "../../../featured/providers/screens/EditProviderScreen/EditProviderScreen";

export default async function EditProviderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const provider = await getProviderById(id);
    if (!provider) {
        return notFound();
    }

    const certificates = await getCertificates();

    return <EditProviderScreen provider={provider.data.data} certificates={certificates} />;
}

async function getProviderById(id: string) {
    try {
        return await (await server()).get<JsonResponse<Provider>>(`/admin/providers/${id}`);
    } catch (error) {
        return null;
    }
}
async function getCertificates() {
    try {
        const response = await (
            await server()
        ).get<JsonResponse<Certificate[]>>("/admin/certificates", {
            params: {
                all: true,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching certificates:", error);
        return [];
    }
}
