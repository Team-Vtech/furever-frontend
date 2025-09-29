import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AddonsClient } from "../../../clients/addons.client";

export function useDeleteAddon() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: AddonsClient.deleteAddon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list-addons"] });
            toastUtils.success.delete("Addon");
            router.push("/addons");
        },
        onError: () => {
            toastUtils.error.delete("Addon");
        },
    });

    return {
        deleteAddon: mutateAsync,
        isDeleting: isPending,
        isError,
    };
}
