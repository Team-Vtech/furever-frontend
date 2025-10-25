import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { server } from "@/app/shared/utils/http.server.utils";
import { PaginatedJsonResponse, Permission } from "@furever/types";
import { Metadata } from "next";
import { CreateRoleScreen } from "../../../featured/roles/screens/CreateRoleScreen/CreateRoleScreen";

export const metadata: Metadata = {
    title: "Create Role",
    description: "Add a new role to the system",
};

export default async function CreateRolePage() {
    const permissions = await getPermissions();

    return (
        <PageLayout
            title="Create Role"
            description="Add a new role to the system"
            breadcrumbs={[{ label: "Roles", href: "/roles" }, { label: "Create" }]}
        >
            <CreateRoleScreen permissions={permissions?.data.data.data ?? []} />
        </PageLayout>
    );
}

async function getPermissions() {
    try {
        return await (
            await server()
        ).get<
            PaginatedJsonResponse<{
                data: Permission[];
            }>
        >(`/admin/permissions`);
    } catch {
        return null;
    }
}
