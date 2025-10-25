import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CreateButton } from "@/app/shared/components/CreateButton";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { Suspense } from "react";
import { UsersListScreen } from "../../featured/users/screens/UsersListScreen/UsersListScreen";

export const metadata: Metadata = {
    title: "Users Management",
    description: "Manage system users, roles, and permissions",
};

export default function UsersPage() {
    return (
        <PageLayout
            title="Users Management"
            breadcrumbs={[{ label: "Users", href: "/users" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any users"]}>
                    <CreateButton label="Create User" href="/users/create" />
                </Authorize>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <UsersListScreen />
            </Suspense>
        </PageLayout>
    );
}
