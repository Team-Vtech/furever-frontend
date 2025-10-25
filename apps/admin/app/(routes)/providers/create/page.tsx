import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse } from "@furever/types/general";
import { Certificate } from "@furever/types/index";
import { Metadata } from "next";
import { Suspense } from "react";
import { CreateProviderScreen } from "../../../featured/providers/screens/CreateProviderScreen/CreateProviderScreen";

export const metadata: Metadata = {
    title: "Create New Provider",
    description: "Add a new service provider to the system",
};

export default async function CreateProviderPage() {
    const certificates = await getCertificates();
    return (
        <Suspense>
            <PageLayout
                title="Create New Provider"
                breadcrumbs={[
                    { label: "Providers", href: "/providers" },
                    { label: "Create", href: "/providers/create" },
                ]}
            >
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <CreateProviderScreen certificates={certificates} />
                </div>
            </PageLayout>
        </Suspense>
    );
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
