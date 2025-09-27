import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddonsClient } from "../../../clients/addons.client";

export function useUpdateAddon() {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: AddonsClient.updateAddon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list-addons"] });
            toastUtils.success.update("Addon");
        },
        onError: () => {
            toastUtils.error.update("Addon");
        },
    });

    return {
        updateAddon: mutateAsync,
        isUpdating: isPending,
        isError,
    }
}
