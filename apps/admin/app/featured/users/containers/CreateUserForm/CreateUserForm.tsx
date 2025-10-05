"use client";

import { PasswordInput } from "@/app/shared/components/PasswordInput/PasswordInput";
import { PhoneInput } from "@/app/shared/components/PhoneInput/PhoneInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getUserDefaultValues, UserFormValues, userSchema } from "@/app/(routes)/api/users/users.schema";
import { CheckboxGroup } from "@/app/shared/components/CheckboxGroup";
import { Provider, Role, User, UserStatus } from "@furever/types";
import { USER_STATUS_OPTIONS } from "../../constant";

interface CreateUserFormProps {
    user?: User;
    onSubmit: (data: UserFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
    roles: Role[];
    providers: Provider[];
}

export function CreateUserForm({ user, onSubmit, onCancel, isLoading, roles = [], providers = [] }: CreateUserFormProps) {
    const defaultValues = getUserDefaultValues(user);
    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues,
    });

    const watchedStatus = watch("status");
    const handleFormSubmit = (data: UserFormValues) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name *
                    </Label>
                    <TextInput name="name" control={control} placeholder="Enter full name" className="mt-1" />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                    </Label>
                    <TextInput name="email" type="email" control={control} placeholder="Enter email address" className="mt-1" />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password {!user && "*"}
                    </Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        control={control}
                        placeholder={user ? "Leave empty to keep current password" : "Enter password"}
                        className="mt-1"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                    </Label>
                    <PhoneInput name="phone" control={control} placeholder="Enter phone number" className="mt-1" />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>

                {/* Location Section */}
                <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">Location Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="location.title" className="text-sm font-medium text-gray-700">
                                Location Title
                            </Label>
                            <TextInput 
                                name="location.title" 
                                control={control} 
                                placeholder="e.g., Home, Office" 
                                className="mt-1" 
                            />
                            {errors.location?.title && <p className="mt-1 text-sm text-red-600">{errors.location.title.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="location.street" className="text-sm font-medium text-gray-700">
                                Street Address
                            </Label>
                            <TextInput 
                                name="location.street" 
                                control={control} 
                                placeholder="Enter street address" 
                                className="mt-1" 
                            />
                            {errors.location?.street && <p className="mt-1 text-sm text-red-600">{errors.location.street.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="location.city" className="text-sm font-medium text-gray-700">
                                City
                            </Label>
                            <TextInput 
                                name="location.city" 
                                control={control} 
                                placeholder="Enter city" 
                                className="mt-1" 
                            />
                            {errors.location?.city && <p className="mt-1 text-sm text-red-600">{errors.location.city.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="location.area" className="text-sm font-medium text-gray-700">
                                Area
                            </Label>
                            <TextInput 
                                name="location.area" 
                                control={control} 
                                placeholder="Enter area/neighborhood" 
                                className="mt-1" 
                            />
                            {errors.location?.area && <p className="mt-1 text-sm text-red-600">{errors.location.area.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="location.latitude" className="text-sm font-medium text-gray-700">
                                Latitude
                            </Label>
                            <TextInput 
                                name="location.latitude" 
                                type="number" 
                                step="any"
                                control={control} 
                                placeholder="Enter latitude" 
                                className="mt-1" 
                            />
                            {errors.location?.latitude && <p className="mt-1 text-sm text-red-600">{errors.location.latitude.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="location.longitude" className="text-sm font-medium text-gray-700">
                                Longitude
                            </Label>
                            <TextInput 
                                name="location.longitude" 
                                type="number" 
                                step="any"
                                control={control} 
                                placeholder="Enter longitude" 
                                className="mt-1" 
                            />
                            {errors.location?.longitude && <p className="mt-1 text-sm text-red-600">{errors.location.longitude.message}</p>}
                        </div>
                    </div>

                    <div>
                        <Label className="flex items-center space-x-2">
                            <TextInput 
                                name="location.is_default" 
                                type="checkbox" 
                                control={control} 
                                className="w-4 h-4" 
                            />
                            <span className="text-sm font-medium text-gray-700">Set as default location</span>
                        </Label>
                        {errors.location?.is_default && <p className="mt-1 text-sm text-red-600">{errors.location.is_default.message}</p>}
                    </div>
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
                <div>
                    <Label htmlFor="provider" className="text-sm font-medium text-gray-700">
                        Provider *
                    </Label>
                    <Select
                        value={watch("provider_id") ? String(watch("provider_id")) : ""}
                        onValueChange={(value) => setValue("provider_id", Number(value))}
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                            {providers.map((option: Provider) => (
                                <SelectItem key={option.id} value={String(option.id)}>
                                    {option.business_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
                </div>
                <div>
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                        Status *
                    </Label>
                    <Select value={watchedStatus} onValueChange={(value) => setValue("status", value as UserStatus)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {USER_STATUS_OPTIONS.map((option: { value: string; label: string }) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
                </div>
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
