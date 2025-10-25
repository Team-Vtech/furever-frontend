"use client";

import { ServiceAddonFormValues, ServiceFormValues } from "@/app/(routes)/api/services/services.schema";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Addon } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Plus, Trash2 } from "lucide-react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";

interface AddonsSectionProps {
    control: Control<ServiceFormValues>;
    isLoading?: boolean;
    addons?: Addon[];
}

export function AddonsSection({ control, isLoading, addons }: AddonsSectionProps) {
    const { formState } = useFormContext<ServiceFormValues>();
    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "addons",
    });

    const addNewAddon = () => {
        const newAddon: ServiceAddonFormValues = {
            addon_id: 0,
            price: "0",
        };
        append(newAddon);
    };

    const removeAddon = (index: number) => {
        remove(index);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Add-ons</h3>
                <p className="text-muted-foreground text-sm">Offer additional services with specific pricing and restrictions.</p>
            </div>

            {/* Addons List */}
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-row items-center gap-x-2 space-y-4 rounded-lg border p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Add-on Selection */}
                            <SelectInput
                                name={`addons.${index}.addon_id`}
                                control={control}
                                options={
                                    addons?.map((addon) => ({
                                        value: addon.id,
                                        label: addon.name,
                                    })) ?? []
                                }
                                placeholder="Select add-on"
                                disabled={isLoading}
                                className="w-full"
                                label="Add-on"
                                required
                            />
                            {/* Price */}
                            <TextInput
                                control={control}
                                name={`addons.${index}.price`}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                disabled={isLoading}
                                label="Price (₹)"
                                required
                            />
                        </div>

                        {/* Remove Button */}
                        <div className="flex justify-center">
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeAddon(index)}
                                disabled={isLoading}
                                className="h-8 w-8 p-0"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* General addons error */}
            {errors.addons && typeof errors.addons === "object" && "message" in errors.addons && (
                <p className="mt-1 text-sm text-red-500">{errors.addons.message}</p>
            )}

            {/* Add Add-on Button */}
            <div className="flex justify-center">
                <Button type="button" variant="outline" onClick={addNewAddon} disabled={isLoading} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Add-on
                </Button>
            </div>
        </div>
    );
}
