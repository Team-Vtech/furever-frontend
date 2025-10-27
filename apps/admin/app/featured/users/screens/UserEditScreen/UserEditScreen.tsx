"use client";

import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Provider, Role, User } from "@furever/types";
import { UserFormValues } from "../../../../(routes)/api/users/users.schema";
import { UserForm } from "../../containers/UserForm/UserForm";
import { useEditUserScreenState } from "./hooks/useEditUserScreenState";

interface UserEditScreenProps {
    user: User;
    roles: Role[];
    providers: Provider[];
}

export function UserEditScreen({ user, roles, providers }: UserEditScreenProps) {
    const { deleteUser, isDeletingUser, isUpdatingUser, updateUser, error, isError } = useEditUserScreenState();

    const handleSubmit = async (data: UserFormValues) => {
        await updateUser({
            id: user.id,
            data,
        });
    };

    const handleDelete = async (id: number) => {
        await deleteUser(id);
    };

    return (
        <PageLayout
            title={`Edit User - ${user.name || user.email}`}
            description="Update user information and settings"
            breadcrumbs={[{ label: "Users", href: "/users" }, { label: "Edit User" }]}
            actions={
                <Authorize permissions={["delete any users", "delete own users"]}>
                    <DeleteRecordDialog
                        recordId={user?.id}
                        recordName={user?.name}
                        onDelete={handleDelete}
                        isDeleting={isDeletingUser}
                        triggerText="Delete User"
                    />
                </Authorize>
            }
        >
            <div className="rounded-lg border bg-white p-6">
                <UserForm
                    user={user}
                    onSubmit={handleSubmit}
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
