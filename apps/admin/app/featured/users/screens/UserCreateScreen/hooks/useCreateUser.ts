import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UsersClient } from "../../../clients/users.client";

export function useCreateUser() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync, isPending, isError, error } = useMutation({
        mutationFn: UsersClient.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["list-users"],
            });

            toastUtils.success.create("User");
            router.push("/users");
        },
        onError: () => {
            toastUtils.error.create("User");
        },
    });

    return { createUser: mutateAsync, isCreatingUser: isPending, isError, error };
}
