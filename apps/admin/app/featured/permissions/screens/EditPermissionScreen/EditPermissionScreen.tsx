"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UpdatePermissionRequest } from "../../../../(routes)/api/permissions/permissions.schema";
import { PermissionForm } from "../../containers/PermissionForm";
import { Permission } from "../../types";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { useDeletePermission } from "./hooks/usePermissionDelete";
import { useUpdatePermission } from "./hooks/useUpdatePermission";

type EditPermissionScreenProps = {
  permission: Permission;
};

export function EditPermissionScreen({
  permission,
}: EditPermissionScreenProps) {
  const { isPending, updatePermission } = useUpdatePermission();
  const { deletePermission, isDeleting } = useDeletePermission();
  const router = useRouter();

  const handleSubmit = async (data: UpdatePermissionRequest) => {
    try {
      await updatePermission({
        id: permission.id,
        data,
      });
      toast.success("Permission updated successfully");
      router.push("/permissions");
    } catch (error) {
      toast.error("Failed to update permission");
      console.error("Error updating permission:", error);
    }
  };

  const handleCancel = () => {
    router.push("/permissions");
  };

  return (
    <PageLayout
      title={`Edit Permission: ${permission.name}`}
      description="Modify the details of the permission."
      breadcrumbs={[
        { label: "Permissions", href: "/permissions" },
        { label: "Edit" },
      ]}
      actions={
        <DeleteRecordDialog
          recordName={permission.name}
          recordId={permission.id}
          onDelete={deletePermission}
          isDeleting={isDeleting}
        />
      }
    >
      <PermissionForm
        permission={permission}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isPending}
      />
    </PageLayout>
  );
}
