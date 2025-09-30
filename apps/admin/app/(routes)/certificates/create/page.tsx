import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Suspense } from "react";
import { CreateCertificateScreen } from "../../../featured/certificates/screens/CreateCertificateScreen/CreateCertificateScreen";

export default function CreateCertificatePage() {
    return (
        <PageLayout title="Create New Certificate" breadcrumbs={[{ label: "Certificates", href: "/certificates" }, { label: "Create" }]}>
            <Suspense fallback={<div>Loading...</div>}>
                <CreateCertificateScreen />
            </Suspense>
        </PageLayout>
    );
}
