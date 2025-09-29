import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, Provider } from "@furever/types";
import { notFound } from "next/navigation";
import { EditProviderScreen } from "../../../featured/providers/screens/EditProviderScreen/EditProviderScreen";

export default async function EditProviderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const provider = await getProviderById(id);
    if (!provider) {
        return notFound();
    }
    return <EditProviderScreen provider={provider.data.data} />;
}

async function getProviderById(id: string) {
    return await (await server()).get<JsonResponse<Provider>>(`/admin/providers/${id}`);
}
