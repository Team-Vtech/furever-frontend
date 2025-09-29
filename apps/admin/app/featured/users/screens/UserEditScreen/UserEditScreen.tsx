"use client";

import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { Provider, Role, User } from "@furever/types";
import { useRouter } from "next/navigation";
import { UserFormValues } from "../../../../(routes)/api/users/users.schema";
import { CreateUserForm } from "../../containers/CreateUserForm";
import { useDeleteUser, useUpdateUser } from "../../hooks/use-users";

interface UserEditScreenProps {
    user: User;
    roles: Role[];
    providers: Provider[];
}

export function UserEditScreen({ user, roles, providers }: UserEditScreenProps) {
    const router = useRouter();
    const updateUserMutation = useUpdateUser();
    const deleteUserMutation = useDeleteUser();

    const handleSubmit = async (data: UserFormValues) => {
        try {
            await updateUserMutation.mutateAsync({
                id: user.id,
                data,
            });
            toastUtils.success.update("User updated successfully");
            router.push("/users");
        } catch {
            toastUtils.error.update("Failed to update user");
        }
    };

    const handleCancel = () => {
        router.push("/users");
    };

    const handleDelete = (id: number) => {
        deleteUserMutation.mutate(id, {
            onSuccess: () => {
                toastUtils.success.create("User deleted successfully");
                router.push("/users");
            },
            onError: () => {
                toastUtils.error.create("Failed to delete user");
            },
        });
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
                    isDeleting={deleteUserMutation.isPending}
                    triggerText="Delete User"
                />
            }
        >
            <div className="rounded-lg border bg-white p-6">
                <CreateUserForm
                    user={user}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={updateUserMutation.isPending}
                    roles={roles}
                    providers={providers}
                />
            </div>
        </PageLayout>
    );
}
