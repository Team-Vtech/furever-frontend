import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ServicesClient } from "../../../clients/services.client";

export function useDeleteServiceMutation() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync: deleteService, isPending: isDeleting } = useMutation({
        mutationFn: (id: number) => ServicesClient.deleteService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            toastUtils.success.delete("Service");
            router.push("/services");
        },
        onError: () => {
            toastUtils.error.delete("Service");
        },
    });
    return {
        deleteService,
        isDeleting,
    };
}
