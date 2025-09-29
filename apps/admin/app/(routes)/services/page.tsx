import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ServicesListScreen } from "../../featured/services/screens/ServicesListScreen/ServicesListScreen";

export default function ServicesPage() {
    return (
        <PageLayout
            title="Services Management"
            description="Manage your services, pricing, and availability."
            breadcrumbs={[{ label: "Services", href: "/services" }, { label: "List" }]}
            actions={
                <Button asChild>
                    <Link href="/services/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Service
                    </Link>
                </Button>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <ServicesListScreen />
            </Suspense>
        </PageLayout>
    );
}
