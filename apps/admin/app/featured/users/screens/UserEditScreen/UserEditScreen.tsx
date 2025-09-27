"use client";

import { useUser, useUpdateUser, useDeleteUser } from "../../hooks/use-users";
import { CreateUserForm } from "../../containers/CreateUserForm";
import { UserFormValues } from "../../../../(routes)/api/users/users.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "@/app/shared/components/Loader/Loader";
import { User } from "../../types";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";

interface UserEditScreenProps {
  user: User;
}

export function UserEditScreen({ user }: UserEditScreenProps) {
  const router = useRouter();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const handleSubmit = async (data: UserFormValues) => {
    try {
      await updateUserMutation.mutateAsync({
        id: user.id,
        data,
      });
      toast.success("User updated successfully");
      router.push("/users");
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    router.push("/users");
  };

  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        toast.success("User deleted successfully");
        router.push("/users");
      },
      onError: () => {
        toast.error("Failed to delete user");
      },
    });
  };

  return (
    <PageLayout
      title="Edit User"
      description="Update user information and settings"
      breadcrumbs={[
        { label: "Users", href: "/users" },
        { label: "Edit User" },
      ]}
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
      <div className="bg-white rounded-lg border p-6">
        <CreateUserForm
          user={user}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={updateUserMutation.isPending}
        />
      </div>
    </PageLayout>
  );
}
