"use client";

import { PasswordInput } from "@/app/shared/components/PasswordInput/PasswordInput";
import { PhoneInput } from "@/app/shared/components/PhoneInput/PhoneInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getUserDefaultValues, UserFormValues, userSchema } from "@/app/(routes)/api/users/users.schema";
import { CheckboxGroup } from "@/app/shared/components/CheckboxGroup";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { Provider, Role, User } from "@furever/types";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { USER_STATUS_OPTIONS } from "../../constant";

interface CreateUserFormProps {
    user?: User;
    onSubmit: (data: UserFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
    roles: Role[];
    providers: Provider[];
    isError?: boolean;
    error?: Error | null;
}

export function CreateUserForm({ user, onSubmit, onCancel, isLoading, roles = [], providers = [], isError, error }: CreateUserFormProps) {
    const defaultValues = getUserDefaultValues(user);
    const {
        handleSubmit,
        formState: { errors },
        control,
        setError,
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues,
    });

    const handleFormSubmit = (body: UserFormValues) => {
        onSubmit(body);
    };

    useEffect(() => {
        if (isError && error) {
            if (isAxiosError(error)) {
                if (error.response?.data) {
                    const errors: Record<keyof UserFormValues, string[]> = error.response.data.errors;
                    if (errors) {
                        Object.entries(errors).forEach(([key, messages]) => {
                            setError(key as keyof UserFormValues, { type: "server", message: messages.join(", ") });
                        });
                        return;
                    }
                }
            }
        }
    }, [isError, error]);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-4">
                <TextInput name="name" control={control} label="Full Name" placeholder="Enter full name" required />

                <TextInput name="email" type="email" label="Email" control={control} required placeholder="Enter email address" className="mt-1" />

                <PasswordInput
                    id="password"
                    name="password"
                    control={control}
                    placeholder={user ? "Leave empty to keep current password" : "Enter password"}
                    className="mt-1"
                    label="Password"
                />

                <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number {"*"}
                    </Label>
                    <PhoneInput name="phone" control={control} placeholder="Enter phone number" className="mt-1" />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>

                <div>
                    <Label htmlFor="addons" className="text-sm font-medium text-gray-700">
                        Roles
                    </Label>

                    <CheckboxGroup
                        name="roles_ids"
                        control={control}
                        options={
                            roles?.map((role) => ({
                                value: role.id,
                                label: role.name,
                            })) ?? []
                        }
                        className="mt-1 w-full"
                    />
                    {errors.roles_ids && <p className="mt-1 text-sm text-red-600">{errors.roles_ids.message}</p>}
                </div>

                <SelectInput
                    control={control}
                    name="provider_id"
                    placeholder="Select provider"
                    className="mt-1"
                    options={providers.map((provider) => ({
                        label: provider.business_name,
                        value: provider.id,
                    }))}
                    label="Provider"
                />
                <SelectInput
                    control={control}
                    name="status"
                    placeholder="Select status"
                    className="mt-1"
                    options={USER_STATUS_OPTIONS.map((status) => ({
                        label: status.label,
                        value: String(status.value),
                    }))}
                    label="Status"
                />
            </div>

            <div className="flex justify-end gap-3 border-t pt-6">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : user ? "Update User" : "Create User"}
                </Button>
            </div>
        </form>
    );
}
