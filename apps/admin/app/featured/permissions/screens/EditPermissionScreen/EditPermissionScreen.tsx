"use client";

import { PermissionFormValues } from "@/app/(routes)/api/permissions/permissions.schema";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { Permission } from "@furever/types/index";
import { useRouter } from "next/navigation";
import { PermissionForm } from "../../containers/PermissionForm";
import { useDeletePermission } from "./hooks/usePermissionDelete";
import { useUpdatePermission } from "./hooks/useUpdatePermission";
import { Authorize } from "@/app/shared/components/Authorize/Authorize";

type EditPermissionScreenProps = {
    permission: Permission;
};

export function EditPermissionScreen({ permission }: EditPermissionScreenProps) {
    const { isPending, updatePermission } = useUpdatePermission();
    const { deletePermission, isDeleting } = useDeletePermission();
    const router = useRouter();

    const handleSubmit = async (data: PermissionFormValues) => {
        try {
            await updatePermission({
                id: permission.id,
                data,
            });
            toastUtils.success.create("Permission");
            router.push("/permissions");
        } catch {
            toastUtils.error.create("Permission");
        }
    };

    const handleCancel = () => {
        router.push("/permissions");
    };

    return (
        <PageLayout
            title={`Edit Permission: ${permission.name}`}
            description="Modify the details of the permission."
            breadcrumbs={[{ label: "Permissions", href: "/permissions" }, { label: "Edit" }]}
            actions={
                <Authorize permissions={["delete any permissions"]}>
                    <DeleteRecordDialog recordName={permission.name} recordId={permission.id} onDelete={deletePermission} isDeleting={isDeleting} />
                </Authorize>
            }
        >
            <PermissionForm permission={permission} onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isPending} />
        </PageLayout>
    );
}
