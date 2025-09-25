"use client";

import { useRouter } from "next/navigation";
import { CreatePermissionRequest } from "../../../../(routes)/api/permissions/permissions.schema";
import { toast } from "sonner";
import { PermissionForm } from "../../containers/PermissionForm";
import { useCreatePermission } from "./hooks/useCreatePermission";

export function CreatePermissionScreen() {
  const router = useRouter();
  const { createPermission, isPending } = useCreatePermission();

  const handleSubmit = async (data: CreatePermissionRequest) => {
    try {
      await createPermission(data);
      toast.success("Permission created successfully");
      router.push("/permissions");
    } catch (error) {
      toast.error("Failed to create permission");
      console.error("Error creating permission:", error);
    }
  };

  const handleCancel = () => {
    router.push("/permissions");
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <PermissionForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isPending}
      />
    </div>
  );
}
