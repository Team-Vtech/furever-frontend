import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CreateButton } from "@/app/shared/components/CreateButton";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { Suspense } from "react";
import { ServicesListScreen } from "../../featured/services/screens/ServicesListScreen/ServicesListScreen";

export const metadata: Metadata = {
    title: "Services Management",
    description: "Manage your services, pricing, and availability",
};

export default function ServicesPage() {
    return (
        <PageLayout
            title="Services Management"
            description="Manage your services, pricing, and availability."
            breadcrumbs={[{ label: "Services", href: "/services" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any services", "create own services"]}>
                    <CreateButton label="Create Service" href="/services/create" />
                </Authorize>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <ServicesListScreen />
            </Suspense>
        </PageLayout>
    );
}
