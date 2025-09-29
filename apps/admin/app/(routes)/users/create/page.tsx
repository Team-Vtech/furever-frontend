import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { server } from "@/app/shared/utils/http.server.utils";
import { UserCreateScreen } from "../../../featured/users/screens/UserCreateScreen/UserCreateScreen";

import { PaginatedJsonResponse, Provider, Role } from "@furever/types";
import { Suspense } from "react";

export default async function CreateUserPage() {
    const roles = await getRoles();
    const providers = await getProviders();
    return (
        <Suspense>
            <PageLayout
                title="Create User"
                description="Add a new user to the system"
                breadcrumbs={[{ label: "Users", href: "/users" }, { label: "Create" }]}
            >
                <UserCreateScreen roles={roles} providers={providers} />
            </PageLayout>
        </Suspense>
    );
}

async function getRoles() {
    try {
        const response = await (
            await server()
        ).get<
            PaginatedJsonResponse<{
                data: Role[];
            }>
        >("/admin/roles");
        return response.data.data.data;
    } catch {
        return [];
    }
}

async function getProviders() {
    try {
        const response = await (
            await server()
        ).get<
            PaginatedJsonResponse<{
                data: Provider[];
            }>
        >("/admin/providers");
        return response.data.data.data;
    } catch {
        return [];
    }
}
