import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CreateButton } from "@/app/shared/components/CreateButton";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { PermissionsListScreen } from "../../featured/permissions/screens/PermissionsListScreen/PermissionsListScreen";

export const metadata: Metadata = {
    title: "Permissions",
    description: "Manage system permissions",
};

export default function PermissionsPage() {
    return (
        <PageLayout
            title="Permissions"
            description="Manage system permissions"
            breadcrumbs={[
                { label: "Permissions", href: "/permissions" },
                {
                    label: "Create",
                },
            ]}
            actions={
                <Authorize permissions={["create any permissions"]}>
                    <CreateButton label="Add Permission" href="/permissions/create" />
                </Authorize>
            }
        >
            <PermissionsListScreen />
        </PageLayout>
    );
}
