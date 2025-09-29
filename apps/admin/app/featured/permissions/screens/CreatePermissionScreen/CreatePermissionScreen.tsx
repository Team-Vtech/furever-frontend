"use client";

import { PermissionFormValues } from "@/app/(routes)/api/permissions/permissions.schema";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useRouter } from "next/navigation";
import { PermissionForm } from "../../containers/PermissionForm";
import { useCreatePermission } from "./hooks/useCreatePermission";

export function CreatePermissionScreen() {
    const router = useRouter();
    const { createPermission, isPending } = useCreatePermission();

    const handleSubmit = async (data: PermissionFormValues) => {
        try {
            await createPermission(data);
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
        <div className="rounded-lg border bg-white p-6">
            <PermissionForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isPending} />
        </div>
    );
}
