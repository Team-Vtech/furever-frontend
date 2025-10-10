"use client";

import { toastUtils } from "@/app/shared/utils/toast.utils";
import { Provider, Role } from "@furever/types";
import { useRouter } from "next/navigation";
import { UserFormValues } from "../../../../(routes)/api/users/users.schema";
import { CreateUserForm } from "../../containers/CreateUserForm";
import { useCreateUser } from "./hooks/useCreateUser";

type UserCreateScreenProps = {
    roles: Role[];
    providers: Provider[];
};

export function UserCreateScreen({ roles, providers }: UserCreateScreenProps) {
    const router = useRouter();
    const { createUser, isCreatingUser, isError, error } = useCreateUser();

    const handleSubmit = async (data: UserFormValues) => {
        try {
            await createUser(data);
            toastUtils.success.create("User created successfully");
            router.push("/users");
        } catch (error) {
            throw error;
        }
    };

    const handleCancel = () => {
        router.push("/users");
    };

    return (
        <div className="rounded-lg border bg-white p-6">
            <CreateUserForm
                isError={isError}
                error={error}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isCreatingUser}
                roles={roles}
                providers={providers}
            />
        </div>
    );
}
