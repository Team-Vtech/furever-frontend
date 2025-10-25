import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CreateButton } from "@/app/shared/components/CreateButton";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { Suspense } from "react";
import { CertificatesListScreen } from "../../featured/certificates/screens/CertificatesListScreen/CertificatesListScreen";

export const metadata: Metadata = {
    title: "Certificates Management",
    description: "Manage provider certificates and qualifications",
};

export default function CertificatesPage() {
    return (
        <PageLayout
            title="Certificates Management"
            breadcrumbs={[{ label: "Certificates", href: "/certificates" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any certificates"]}>
                    <CreateButton label="Create Certificate" href="/certificates/create" />
                </Authorize>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <CertificatesListScreen />
            </Suspense>
        </PageLayout>
    );
}
