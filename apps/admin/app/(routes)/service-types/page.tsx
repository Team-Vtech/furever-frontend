import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CreateButton } from "@/app/shared/components/CreateButton";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { Suspense } from "react";
import { ServiceTypesListScreen } from "../../featured/service-types/screens/ServiceTypesListScreen";

export const metadata: Metadata = {
    title: "Service Types",
    description: "Manage service types and categories",
};

export default function ServiceTypesPage() {
    return (
        <PageLayout
            title="Service types"
            breadcrumbs={[{ label: "Service types", href: "/service-types" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any service types"]}>
                    <CreateButton label="Create Service Type" href="/service-types/create" />
                </Authorize>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <ServiceTypesListScreen />
            </Suspense>
        </PageLayout>
    );
}
