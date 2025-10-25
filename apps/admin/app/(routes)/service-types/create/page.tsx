import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { Suspense } from "react";
import { CreateServiceTypeScreen } from "../../../featured/service-types/screens/CreateServiceTypeScreen";

export const metadata: Metadata = {
    title: "Create Service Type",
    description: "Add a new service type to the system",
};

export default function CreateServiceTypePage() {
    return (
        <PageLayout title="Create service types" breadcrumbs={[{ label: "Service types", href: "/service-types" }, { label: "Create" }]}>
            <Suspense fallback={<div>Loading...</div>}>
                <CreateServiceTypeScreen />
            </Suspense>
        </PageLayout>
    );
}
