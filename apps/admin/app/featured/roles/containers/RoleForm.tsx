"use client";

import { CheckboxGroup } from "@/app/shared/components/CheckboxGroup";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Permission, Role } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RoleFormValues, roleSchema } from "../../../(routes)/api/roles/roles.schema";

interface RoleFormProps {
    role?: Role;
    onSubmit: (data: RoleFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
    permissions: Permission[];
}

export function RoleForm({ role, onSubmit, onCancel, isLoading, permissions }: RoleFormProps) {
    const formMethods = useForm<RoleFormValues>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: role?.name || "",
            permissions: role?.permissions.map((permission) => permission.id) || [],
        },
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = formMethods;

    useEffect(() => {
        if (role) {
            formMethods.reset({
                name: role.name,
            });
        }
    }, [role, formMethods]);

    const handleFormSubmit = (data: RoleFormValues) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Role Name *
                    </Label>
                    <TextInput name="name" control={control} placeholder="Enter role name" className="mt-1" />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>
            </div>
            <CheckboxGroup
                name="permissions"
                control={control}
                options={permissions.map((permission) => ({
                    value: permission.id,
                    label: permission.name,
                }))}
                disabled={isLoading}
                className="grid grid-cols-2 gap-2 md:grid-cols-3"
            />
            <div className="flex justify-end gap-3 border-t pt-6">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : role ? "Update Role" : "Create Role"}
                </Button>
            </div>
        </form>
    );
}
