import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RolesClient } from "../../../clients/roles.client";

export function useDeleteRole() {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: RolesClient.deleteRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
            toastUtils.success.delete("Role");
        },
        onError: () => {
            toastUtils.error.delete("Role");
        },
    });
    return { deleteRole: mutateAsync, isDeleting: isPending };
}
