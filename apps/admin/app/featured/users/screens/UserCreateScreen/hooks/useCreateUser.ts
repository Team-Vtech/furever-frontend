import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersClient } from "../../../clients/users.client";
import { toastUtils } from "@/app/shared/utils/toast.utils";

export function useCreateUser() {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: UsersClient.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["list-users"],
            });

            toastUtils.success.create("User");
        },
        onError: () => {
            toastUtils.error.create("User");
        }
    });

    return { createUser: mutateAsync, isCreatingUser: isPending };
}
