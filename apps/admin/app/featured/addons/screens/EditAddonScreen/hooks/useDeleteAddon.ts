import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddonsClient } from "../../../clients/addons.client";

export function useDeleteAddon() {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: AddonsClient.deleteAddon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list-addons"] });
            toastUtils.success.delete("Addon");
        },
        onError: () => {
            toastUtils.error.delete("Addon");
        },
    });

    return {
        deleteAddon: mutateAsync,
        isDeleting: isPending,
        isError,
    }
}
