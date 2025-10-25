import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { Suspense } from "react";
import { CreateCertificateScreen } from "../../../featured/certificates/screens/CreateCertificateScreen/CreateCertificateScreen";

export const metadata: Metadata = {
    title: "Create New Certificate",
    description: "Add a new certificate to the system",
};

export default function CreateCertificatePage() {
    return (
        <PageLayout title="Create New Certificate" breadcrumbs={[{ label: "Certificates", href: "/certificates" }, { label: "Create" }]}>
            <Suspense fallback={<div>Loading...</div>}>
                <CreateCertificateScreen />
            </Suspense>
        </PageLayout>
    );
}
