import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, Provider } from "@furever/types";
import { isAxiosError } from "axios";
import { notFound } from "next/navigation";
import { ProviderViewScreen } from "../../../../featured/providers/screens/ProviderViewScreen/ProviderViewScreen";

export default async function ProviderViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const provider = await getProviderById(id);

    if (!provider) {
        return notFound();
    }

    return <ProviderViewScreen provider={provider.data.data} />;
}

async function getProviderById(id: string) {
    try {
        return await (await server()).get<JsonResponse<Provider>>(`/admin/providers/${id}`);
    } catch (error) {
        console.log(error, "error");
        if (isAxiosError(error)) {
            console.log(error.response?.data, "error response");
        }
        return null;
    }
}
