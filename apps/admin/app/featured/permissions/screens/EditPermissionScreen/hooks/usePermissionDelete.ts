import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionsClient } from "../../../clients/permissions.client";

export function useDeletePermission() {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: PermissionsClient.deletePermission,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["permissions"] });
            toastUtils.success.delete("Permission");
        },
        onError: () => {
            toastUtils.error.delete("Permission");
        },
    });
    return { deletePermission: mutateAsync, isDeleting: isPending };
}
