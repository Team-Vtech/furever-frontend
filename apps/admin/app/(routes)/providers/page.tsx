import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CreateButton } from "@/app/shared/components/CreateButton";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { Suspense } from "react";
import { ProvidersListScreen } from "../../featured/providers/screens/ProvidersListScreen/ProvidersListScreen";

export const metadata: Metadata = {
    title: "Providers Management",
    description: "Manage service providers and their information",
};

export default function ProvidersPage() {
    return (
        <PageLayout
            title="Providers Management"
            breadcrumbs={[{ label: "Providers", href: "/providers" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any providers"]}>
                    <CreateButton label="Create Provider" href="/providers/create" />
                </Authorize>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <ProvidersListScreen />
            </Suspense>
        </PageLayout>
    );
}
