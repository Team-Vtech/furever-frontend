import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ServicesClient } from "../../../clients/services.client";

export function useUpdateServiceMutation() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync: updateService, isPending: isUpdating } = useMutation({
        mutationFn: ServicesClient.updateService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            toastUtils.success.update("Service");
            router.push("/services");
        },
        onError: () => {
            toastUtils.error.update("Service");
        },
    });
    return {
        updateService,
        isUpdating,
    };
}
