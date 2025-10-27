"use client";

import { Provider, Role } from "@furever/types";
import { UserFormValues } from "../../../../(routes)/api/users/users.schema";
import { UserForm } from "../../containers/UserForm/UserForm";
import { useCreateUser } from "./hooks/useCreateUser";

type UserCreateScreenProps = {
    roles: Role[];
    providers: Provider[];
};

export function UserCreateScreen({ roles, providers }: UserCreateScreenProps) {
    const { createUser, isCreatingUser, isError, error } = useCreateUser();

    const handleSubmit = async (data: UserFormValues) => {
        try {
            await createUser(data);
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="rounded-lg border bg-white p-6">
            <UserForm isError={isError} error={error} onSubmit={handleSubmit} isLoading={isCreatingUser} roles={roles} providers={providers} />
        </div>
    );
}
