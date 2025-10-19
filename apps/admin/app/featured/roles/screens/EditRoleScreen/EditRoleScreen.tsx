"use client";

import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Permission, Role } from "@furever/types";
import { useRouter } from "next/navigation";
import { RoleFormValues } from "../../../../(routes)/api/roles/roles.schema";
import { RoleForm } from "../../containers/RoleForm";
import { useDeleteRole } from "./hooks/useRoleDelete";
import { useRoleUpdate } from "./hooks/useRoleUpdate";

type EditRoleScreenProps = {
    role: Role;
    permissions: Permission[];
};

export function EditRoleScreen({ role, permissions }: EditRoleScreenProps) {
    const { isUpdating, updateRole } = useRoleUpdate();
    const { deleteRole, isDeleting } = useDeleteRole();
    const router = useRouter();
    const handleSubmit = async (data: RoleFormValues) => {
        await updateRole({
            id: role.id,
            data,
        });
    };

    const handleCancel = () => {
        router.push("/roles");
    };

    return (
        <PageLayout
            title={`Edit Role: ${role.name}`}
            description="Modify the details of the role."
            breadcrumbs={[{ label: "Roles", href: "/roles" }, { label: "Edit" }]}
            actions={
                <Authorize permissions={["delete any roles"]}>
                    <DeleteRecordDialog recordName={role.name} recordId={role.id} onDelete={deleteRole} isDeleting={isDeleting} />
                </Authorize>
            }
        >
            <RoleForm role={role} onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isUpdating} permissions={permissions} />
        </PageLayout>
    );
}
