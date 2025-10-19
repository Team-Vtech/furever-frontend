"use client";

import { CertificateFormValues } from "@/app/(routes)/api/certificates/certificates.schema";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Certificate } from "@furever/types";
import { useRouter } from "next/navigation";
import { CertificateForm } from "../../containers/CertificateForm";
import { useDeleteCertificate } from "./hooks/useDeleteCertificate";
import { useUpdateCertificate } from "./hooks/useUpdateCertificate";

interface EditCertificateScreenProps {
    certificate: Certificate;
}

export function EditCertificateScreen({ certificate }: EditCertificateScreenProps) {
    const router = useRouter();

    const { updateCertificate, isUpdating } = useUpdateCertificate();
    const { deleteCertificate, isDeleting } = useDeleteCertificate();

    const handleSubmit = (data: CertificateFormValues) => {
        updateCertificate({ id: certificate.id, data });
    };

    const handleCancel = () => {
        router.push("/certificates");
    };

    const handleDelete = () => {
        deleteCertificate(certificate.id);
    };

    return (
        <PageLayout
            title={`Update the details for "${certificate.name}"`}
            actions={<DeleteRecordDialog recordId={certificate.id} recordName={certificate.name} onDelete={handleDelete} isDeleting={isDeleting} />}
            breadcrumbs={[
                { label: certificate.name, href: `/certificates/${certificate.id}` },
                { label: "Edit", href: "#" },
            ]}
        >
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <CertificateForm certificate={certificate} onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isUpdating} />
            </div>
        </PageLayout>
    );
}
