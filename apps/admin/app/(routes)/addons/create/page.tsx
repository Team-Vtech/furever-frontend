import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Suspense } from "react";
import { CreateAddonScreen } from "../../../featured/addons/screens/CreateAddonScreen/CreateAddonScreen";

export default function CreateAddonPage() {
    return (
        <PageLayout title="Create New Addon" breadcrumbs={[{ label: "Addons", href: "/addons" }, { label: "Create" }]}>
            <Suspense fallback={<div>Loading...</div>}>
                <CreateAddonScreen />
            </Suspense>
        </PageLayout>
    );
}
