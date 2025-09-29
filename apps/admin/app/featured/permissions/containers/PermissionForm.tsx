"use client";

import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getPermissionDefaultValues, PermissionFormValues, permissionSchema } from "@/app/(routes)/api/permissions/permissions.schema";
import { CheckboxGroup } from "@/app/shared/components/CheckboxGroup";
import { Permission } from "@furever/types";
import { useEffect } from "react";
import { useRoles } from "../hooks/use-permissions";

interface PermissionFormProps {
    permission?: Permission;
    onSubmit: (data: PermissionFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function PermissionForm({ permission, onSubmit, onCancel, isLoading }: PermissionFormProps) {
    const { data: roles, isLoading: rolesLoading } = useRoles();
    const defaultValues = getPermissionDefaultValues(permission);
    const formMethods = useForm<PermissionFormValues>({
        resolver: zodResolver(permissionSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = formMethods;

    useEffect(() => {
        if (permission) {
            formMethods.reset({
                name: permission.name,
                roles: permission.roles?.map((role) => role.id) || [],
            });
        }
    }, [permission, formMethods]);

    const handleFormSubmit = (data: PermissionFormValues) => {
        onSubmit(data);
    };

    const roleOptions =
        roles?.map((role) => ({
            value: role.id,
            label: role.name,
        })) || [];

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Permission Name *
                    </Label>
                    <TextInput name="name" control={control} placeholder="Enter permission name" className="mt-1" />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                    <Label htmlFor="roles" className="text-sm font-medium text-gray-700">
                        Assign to Roles
                    </Label>
                    <CheckboxGroup name="roles" control={control} options={roleOptions} className="mt-1" disabled={rolesLoading} />
                    {errors.roles && <p className="mt-1 text-sm text-red-600">{errors.roles.message}</p>}
                </div>
            </div>

            <div className="flex justify-end gap-3 border-t pt-6">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={isLoading || rolesLoading}>
                    {isLoading ? "Saving..." : permission ? "Update Permission" : "Create Permission"}
                </Button>
            </div>
        </form>
    );
}
