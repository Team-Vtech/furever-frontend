import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { CertificatesListScreen } from "../../featured/certificates/screens/CertificatesListScreen/CertificatesListScreen";

export default function CertificatesPage() {
    return (
        <PageLayout
            title="Certificates Management"
            breadcrumbs={[{ label: "Certificates", href: "/certificates" }, { label: "List" }]}
            actions={
                <Button asChild>
                    <Link href="/certificates/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Certificate
                    </Link>
                </Button>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <CertificatesListScreen />
            </Suspense>
        </PageLayout>
    );
}
