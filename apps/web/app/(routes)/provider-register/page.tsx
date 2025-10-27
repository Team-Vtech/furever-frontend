import { server } from "@/app/shared/utils/http.server.utils";
import { Certificate, JsonResponse } from "@furever/types";
import { Metadata } from "next";
import { Suspense } from "react";
import { ProviderRegistrationScreen } from "../../featured/providers/screens/ProviderRegistrationScreen/ProviderRegistrationScreen";

export const metadata: Metadata = {
    title: "Become a Provider - Furever",
    description: "Join our community of trusted pet care professionals and help pet owners find the best care for their furry friends.",
};

export default async function ProviderRegisterPage() {
    const certificates = await getCertificates();
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-gray-50">
                    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
                </div>
            }
        >
            <ProviderRegistrationScreen certificates={certificates ?? []} />
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
