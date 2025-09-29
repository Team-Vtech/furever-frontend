import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionsClient } from "../../../clients/permissions.client";

export function useUpdatePermission() {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: PermissionsClient.updatePermission,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["permissions"] });
            queryClient.invalidateQueries({
                queryKey: ["permissions", variables.id.toString()],
            });
            toastUtils.success.create("Permission");
        },
        onError: () => {
            toastUtils.error.create("Permission");
        },
    });
    return { updatePermission: mutateAsync, isPending };
}
