import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CreateButton } from "@/app/shared/components/CreateButton";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { RolesListScreen } from "../../featured/roles/screens/RolesListScreen/RolesListScreen";

export const metadata: Metadata = {
    title: "Roles",
    description: "Manage system roles and permissions",
};

export default function RolesPage() {
    return (
        <PageLayout
            title="Roles"
            description="Manage system roles"
            breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Roles" }]}
            actions={
                <Authorize permissions={["create any roles"]}>
                    <CreateButton label="Create Role" href="/roles/create" />
                </Authorize>
            }
        >
            <RolesListScreen />
        </PageLayout>
    );
}
