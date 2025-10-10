import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UsersClient } from "../../../clients/users.client";

export function useEditUserScreenState() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync: updateUser, isPending: isUpdatingUser, error, isError } = useMutation({
        mutationFn: UsersClient.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["list-users"],
            });
            toastUtils.success.update("User");
            router.push("/users");
        },
        onError: (error) => {
            toastUtils.error.update("User", error);
        },
    });

    const { mutateAsync: deleteUser, isPending: isDeletingUser } = useMutation({
        mutationFn: UsersClient.deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["list-users"],
            });
            toastUtils.success.delete("User");
            router.push("/users");
        },
        onError: (error) => {
            toastUtils.error.delete("User", error);
        },
    });

    return {
        updateUser,
        isUpdatingUser,
        deleteUser,
        isDeletingUser,
        isError,
        error,
    };
}
