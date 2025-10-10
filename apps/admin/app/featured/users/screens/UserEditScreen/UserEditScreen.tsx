"use client";

import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Provider, Role, User } from "@furever/types";
import { useRouter } from "next/navigation";
import { UserFormValues } from "../../../../(routes)/api/users/users.schema";
import { CreateUserForm } from "../../containers/CreateUserForm";
import { useEditUserScreenState } from "./hooks/useEditUserScreenState";

interface UserEditScreenProps {
    user: User;
    roles: Role[];
    providers: Provider[];

}

export function UserEditScreen({ user, roles, providers }: UserEditScreenProps) {
    const router = useRouter();
    const { deleteUser, isDeletingUser, isUpdatingUser, updateUser, error, isError } = useEditUserScreenState();

    const handleSubmit = async (data: UserFormValues) => {
        await updateUser({
            id: user.id,
            data,
        });
    };

    const handleCancel = () => {
        router.push("/users");
    };

    const handleDelete = async (id: number) => {
        await deleteUser(id);
    };

    return (
        <PageLayout
            title="Edit User"
            description="Update user information and settings"
            breadcrumbs={[{ label: "Users", href: "/users" }, { label: "Edit User" }]}
            actions={
                <DeleteRecordDialog
                    recordId={user?.id}
                    recordName={user?.name}
                    onDelete={handleDelete}
                    isDeleting={isDeletingUser}
                    triggerText="Delete User"
                />
            }
        >
            <div className="rounded-lg border bg-white p-6">
                <CreateUserForm
                    user={user}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdatingUser}
                    roles={roles}
                    error={error}
                    isError={isError}
                    providers={providers}
                />
            </div>
        </PageLayout>
    );
}
