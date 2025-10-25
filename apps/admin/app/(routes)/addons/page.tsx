import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CreateButton } from "@/app/shared/components/CreateButton";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { Suspense } from "react";
import { AddonsListScreen } from "../../featured/addons/screens/AddonsListScreen/AddonsListScreen";

export const metadata: Metadata = {
    title: "Addons Management",
    description: "Manage service addons and extras",
};

export default function AddonsPage() {
    return (
        <PageLayout
            title="Addons Management"
            breadcrumbs={[{ label: "Addons", href: "/addons" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any addons"]}>
                    <CreateButton label="Add Addon" href="/addons/create" />
                </Authorize>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <AddonsListScreen />
            </Suspense>
        </PageLayout>
    );
}
