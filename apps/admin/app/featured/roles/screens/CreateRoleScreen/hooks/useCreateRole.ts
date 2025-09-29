import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RolesClient } from "../../../clients/roles.client";

export function useCreateRole() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-role"],
        mutationFn: RolesClient.createRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
            toastUtils.success.create("Role");
            router.push("/roles");
        },
        onError: () => {
            toastUtils.error.create("Role");
        },
    });
    return {
        createRole: mutateAsync,
        isCreating: isPending,
    };
}
