"use client";

import { toastUtils } from "@/app/shared/utils/toast.utils";
import { Permission } from "@furever/types";
import { useRouter } from "next/navigation";
import { RoleFormValues } from "../../../../(routes)/api/roles/roles.schema";
import { RoleForm } from "../../containers/RoleForm";
import { useCreateRole } from "./hooks/useCreateRole";

export type CreateRoleScreenProps = {
    permissions: Permission[];
};

export function CreateRoleScreen({ permissions }: CreateRoleScreenProps) {
    const router = useRouter();
    const { createRole, isCreating } = useCreateRole();

    const handleSubmit = async (data: RoleFormValues) => {
        try {
            await createRole(data);
            toastUtils.success.create("Role created successfully");
            router.push("/roles");
        } catch {
            toastUtils.error.create("Failed to create role");
        }
    };

    const handleCancel = () => {
        router.push("/roles");
    };

    return (
        <div className="rounded-lg border bg-white p-6">
            <RoleForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isCreating} permissions={permissions} />
        </div>
    );
}
