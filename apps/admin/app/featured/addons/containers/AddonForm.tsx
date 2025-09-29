"use client";

import { AddonFormValues, addonSchema } from "@/app/(routes)/api/addons/addons.schema";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Addon, GeneralStatus } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

interface AddonFormProps {
    addon?: Addon;
    onSubmit: (data: AddonFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function AddonForm({ addon, onSubmit, onCancel, isLoading }: AddonFormProps) {
    const formMethods = useForm<AddonFormValues>({
        resolver: zodResolver(addonSchema),
        defaultValues: {
            name: addon?.name || "",
            description: addon?.description || "",
            status: addon?.status || GeneralStatus.ACTIVE,
        },
    });

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
    } = formMethods;

    const watchedStatus = watch("status");

    const handleFormSubmit = (data: AddonFormValues) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Addon Name *
                        </Label>
                        <TextInput id="name" name="name" control={control} placeholder="Enter addon name" className="mt-1" />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                            Description *
                        </Label>
                        <TextAreaInput
                            id="description"
                            name="description"
                            control={control}
                            placeholder="Enter addon description"
                            rows={4}
                            className="mt-1"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={watchedStatus} onValueChange={(value: GeneralStatus) => setValue("status", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(GeneralStatus).map((statusValue) => (
                                    <SelectItem key={statusValue} value={statusValue}>
                                        {statusValue.charAt(0).toUpperCase() + statusValue.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.status && <p className="text-sm text-red-600">{errors.status.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t pt-6">
                    {onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : addon ? "Update Addon" : "Create Addon"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
