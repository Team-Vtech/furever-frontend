import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UsersClient } from "../clients/users.client";

const USERS_QUERY_KEY = "users";

export const useUser = (id: string) => {
    return useQuery({
        queryKey: [USERS_QUERY_KEY, id],
        queryFn: () => UsersClient.getUser(id),
        enabled: !!id,
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: UsersClient.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [USERS_QUERY_KEY],
            });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: UsersClient.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [USERS_QUERY_KEY],
            });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => UsersClient.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [USERS_QUERY_KEY],
            });
        },
    });
};
