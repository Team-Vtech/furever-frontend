import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProvidersClient } from "../../../clients/providers.client";

export function useProviderMutation() {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ProvidersClient.updateProvider,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["providers"] });
            toastUtils.success.update("Provider");
        },
        onError: (error) => {
            console.error("Error updating provider:", error);
            toastUtils.error.update("Provider");
        },
    });

    return {
        updateProvider: mutateAsync,
        isUpdating: isPending,
    };
}
