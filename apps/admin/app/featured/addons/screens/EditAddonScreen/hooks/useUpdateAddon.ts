import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AddonsClient } from "../../../clients/addons.client";

export function useUpdateAddon() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: AddonsClient.updateAddon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list-addons"] });
            toastUtils.success.update("Addon");
            router.push("/addons");
        },
        onError: () => {
            toastUtils.error.update("Addon");
        },
    });

    return {
        updateAddon: mutateAsync,
        isUpdating: isPending,
        isError,
    };
}
