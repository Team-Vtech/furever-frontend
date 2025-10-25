import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { CreatePermissionScreen } from "../../../featured/permissions/screens/CreatePermissionScreen/CreatePermissionScreen";

export const metadata: Metadata = {
    title: "Create Permission",
    description: "Add a new permission to the system",
};

export default function CreatePermissionPage() {
    return (
        <PageLayout
            title="Create Permission"
            description="Add a new permission to the system"
            breadcrumbs={[{ label: "Permissions", href: "/permissions" }, { label: "Create" }]}
        >
            <CreatePermissionScreen />
        </PageLayout>
    );
}
