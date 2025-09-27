import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddonsClient } from "../../../clients/addons.client";

export function useCreateAddon() {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: AddonsClient.createAddon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list-addons"] });
            toastUtils.success.create("Addon");
        },
        onError: (error: any) => {
            toastUtils.error.create("Addon");
        },
    });

    return {
        createAddon: mutateAsync,
        isCreating: isPending,
        isError,
    }
}
