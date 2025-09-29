import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionsClient } from "../../../clients/permissions.client";

export function useCreatePermission() {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: PermissionsClient.createPermission,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["permissions"] });
            toastUtils.success.create("Permission");
        },
        onError: () => {
            toastUtils.error.create("Permission");
        },
    });
    return { createPermission: mutateAsync, isPending };
}
