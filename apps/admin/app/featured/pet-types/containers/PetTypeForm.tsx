"use client";

import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { GeneralStatus, PetType } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { getPetTypeDefaults, PetTypeFormValues, petTypeSchema } from "../../../(routes)/api/pet-types/schema";
import { PetBreedSection } from "../components/PetBreedSection/PetBreedSection";
import { SelectInput } from "@/app/shared/components/SelectInput";

type PetTypeFormProps = {
    onSubmit: (data: PetTypeFormValues) => void;
    isLoading?: boolean;
    petType?: PetType;
};

export function PetTypeForm({ onSubmit, isLoading = false, petType }: PetTypeFormProps) {
    const defaultValues = getPetTypeDefaults(petType);
    const methods = useForm<PetTypeFormValues>({
        resolver: zodResolver(petTypeSchema),
        defaultValues,
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onFormSubmit = (data: PetTypeFormValues) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <TextInput label="Name" required control={control} name="name" placeholder="Enter pet type name" disabled={isLoading} />
                </div>

                <div className="space-y-2">
                    <SelectInput
                        required
                        control={control}
                        name="status"
                        label="Status"
                        options={
                            Object.values(GeneralStatus).map((statusValue) => ({
                                label: statusValue.charAt(0).toUpperCase() + statusValue.slice(1),
                                value: statusValue,
                            }))
                        }
                    />
                </div>

                <PetBreedSection control={control} />

                <div className="flex justify-end gap-4 pt-6">
                    <Button type="submit" disabled={isLoading}>
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? (petType ? "Updating..." : "Creating...") : petType ? "Update Pet Type" : "Create Pet Type"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
