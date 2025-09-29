import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RolesClient } from "../../../clients/roles.client";

export function useRoleUpdate() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: RolesClient.updateRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
            toastUtils.success.update("Role");
            router.push("/roles");
        },
        onError: () => {
            toastUtils.error.update("Role");
        },
    });
    return { updateRole: mutateAsync, isUpdating: isPending };
}
