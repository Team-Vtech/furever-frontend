"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RoleFormValues } from "../../../../(routes)/api/roles/roles.schema";
import { RoleForm } from "../../containers/RoleForm";
import { useUpdateRole } from "../../hooks/use-roles";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { useDeleteRole } from "./hooks/useRoleDelete";
import { Permission, Role } from "@furever/types";

type EditRoleScreenProps = {
  role: Role;
  permissions: Permission[];
};

export function EditRoleScreen({ role, permissions }: EditRoleScreenProps) {
  const updateRoleMutation = useUpdateRole();
  const { deleteRole, isDeleting } = useDeleteRole();
  const router = useRouter();
  console.log(permissions, "permissions");
  const handleSubmit = async (data: RoleFormValues) => {
    try {
      await updateRoleMutation.mutateAsync({
        id: role.id,
        data,
      });
      toast.success("Role updated successfully");
      router.push("/admin/roles");
    } catch (error) {
      toast.error("Failed to update role");
      console.error("Error updating role:", error);
    }
  };

  const handleCancel = () => {
    router.push("/admin/roles");
  };

  return (
    <PageLayout
      title={`Edit Role: ${role.name}`}
      description="Modify the details of the role."
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Roles", href: "/admin/roles" },
        { label: "Edit" },
      ]}
      actions={
        <DeleteRecordDialog
          recordName={role.name}
          recordId={role.id}
          onDelete={deleteRole}
          isDeleting={isDeleting}
        />
      }
    >
      <RoleForm
        role={role}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateRoleMutation.isPending}
        permissions={permissions}
      />
    </PageLayout>
  );
}
