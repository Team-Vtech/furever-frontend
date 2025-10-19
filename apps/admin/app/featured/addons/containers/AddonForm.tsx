"use client";

import { AddonFormValues, addonSchema } from "@/app/(routes)/api/addons/addons.schema";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Addon, GeneralStatus } from "@furever/types";
import { Button } from "@furever/ui/components/button";
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
                    <TextInput label="Name" required id="name" name="name" control={control} placeholder="Enter addon name" className="mt-1" />

                    <TextAreaInput
                        id="description"
                        name="description"
                        control={control}
                        placeholder="Enter addon description"
                        rows={4}
                        className="mt-1"
                        label="Description"
                        required
                    />

                    <SelectInput
                        required
                        control={control}
                        name="status"
                        label="Status"
                        options={Object.values(GeneralStatus).map((statusValue) => ({
                            label: statusValue.charAt(0).toUpperCase() + statusValue.slice(1),
                            value: statusValue,
                        }))}
                    />
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
