import { CertificateFormValues } from "@/app/(routes)/api/certificates/certificates.schema";
import { client } from "@/app/shared/utils/http.client.utils";
import { Certificate, JsonResponse, PaginatedJsonResponse } from "@furever/types";
import { ENDPOINTS } from "../constants";

export const CertificatesClient = {
    async getCertificates({ queryKey }: { queryKey: string[] }) {
        const response = await client().get<
            PaginatedJsonResponse<{
                data: Certificate[];
            }>
        >(ENDPOINTS.getCertificates.url, {
            params: new URLSearchParams(queryKey[1]),
        });
        return response.data;
    },

    async getCertificate(id: string) {
        const response = await client().get<JsonResponse<Certificate>>(`${ENDPOINTS.getCertificates.url}/${id}`);
        return response.data;
    },

    async createCertificate(data: CertificateFormValues) {
        const response = await client().post<JsonResponse<Certificate>>(ENDPOINTS.createCertificate.url, data);
        return response.data;
    },

    async updateCertificate({ id, data }: { id: number; data: CertificateFormValues }) {
        const response = await client().put<JsonResponse<Certificate>>(ENDPOINTS.updateCertificates.url(id), data);
        return response.data;
    },

    async deleteCertificate(id: number) {
        const response = await client().delete<JsonResponse<void>>(ENDPOINTS.deleteCertificates.url(id));
        return response.data;
    },
};
