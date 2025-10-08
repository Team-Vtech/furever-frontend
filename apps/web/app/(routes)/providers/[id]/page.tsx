import { ProviderProfileScreen } from "@/app/featured/providers/screens/ProviderProfileScreen/ProviderProfileScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";
import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, Provider } from "@furever/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProviderPageProps {
    params: Promise<{
        id: string;
    }>;
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

export default async function ProviderPage({ params }: ProviderPageProps) {
    const { id } = await params;
    const provider = await getProvider(id);

    if (!provider) {
        return notFound();
    }
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <ProviderProfileScreen provider={provider} />
            </Suspense>
        </MainLayout>
    );
}
