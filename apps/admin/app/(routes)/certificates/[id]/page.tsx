import { server } from "@/app/shared/utils/http.server.utils";
import { Certificate, JsonResponse } from "@furever/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EditCertificateScreen } from "../../../featured/certificates/screens/EditCertificateScreen/EditCertificateScreen";

interface EditCertificatePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditCertificatePage({ params }: EditCertificatePageProps) {
    const { id } = await params;
    if (!id) {
        return notFound();
    }

    const certificate = await getCertificateById(id);

    if (!certificate?.data) {
        return notFound();
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditCertificateScreen certificate={certificate.data.data} />
        </Suspense>
    );
}

async function getCertificateById(id: string) {
    try {
        return await (await server()).get<JsonResponse<Certificate>>(`/admin/certificates/${id}`);
    } catch {
        return null;
    }
}
