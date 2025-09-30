"use client";

import { CertificateFormValues } from "@/app/(routes)/api/certificates/certificates.schema";
import { useRouter } from "next/navigation";
import { CertificateForm } from "../../containers/CertificateFormForm";
import { useCreateCertificate } from "./hooks/useCreateCertificate";

export function CreateCertificateScreen() {
    const router = useRouter();
    const { createCertificate, isCreating } = useCreateCertificate();

    const handleSubmit = (data: CertificateFormValues) => {
        createCertificate(data, {
            onSuccess: () => {
                router.push("/certificates");
            },
        });
    };

    const handleCancel = () => {
        router.push("/certificates");
    };

    return <CertificateForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isCreating} />;
}
