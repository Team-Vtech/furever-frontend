"use client";
import { DateInput } from "@/app/shared/components/DateInput/DateInput";
import { SelectInput } from "@/app/shared/components/SelectInput/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { UploadMedia } from "@/app/shared/components/UploadMedia/UploadMedia";
import { usePetTypes } from "@/app/shared/hooks/usePetTypes";
import { Pet } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PetFormValues, getPetDefaultValues, petSchema } from "../schemas/pet.schema";

export type PetFormProps = {
    pet?: Pet;
    onSubmit: (data: PetFormValues) => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export function PetForm({ pet, onSubmit, onCancel, isLoading }: PetFormProps) {
    const defaultValues = getPetDefaultValues(pet);
    const { data: petTypes = [] } = usePetTypes();

    const {
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<PetFormValues>({
        resolver: zodResolver(petSchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextInput control={control} name="name" label="Pet Name" placeholder="Enter pet name" />

            <div>
                <Label htmlFor="pet_type_id">Pet Type *</Label>

                <SelectInput
                    control={control}
                    name="pet_type_id"
                    options={petTypes.map((type) => ({ value: type.id, label: type.name }))}
                    placeholder="Select pet type"
                />
            </div>

            <div>
                <Label htmlFor="pet_breed_id">Pet Breed *</Label>
                <SelectInput
                    control={control}
                    name="pet_breed_id"
                    options={petTypes
                        .filter((type) => type.id === watch("pet_type_id"))
                        .flatMap((type) => type.pet_breeds?.map((breed) => ({ value: breed.id, label: breed.name })) || [])}
                />
            </div>

            <div>
                <Label htmlFor="gender">Gender *</Label>
                <SelectInput
                    control={control}
                    name="gender"
                    options={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                    ]}
                    placeholder="Select gender"
                />
            </div>

            <DateInput control={control} name="date_of_birth" label="Date of Birth" placeholder="Select date of birth" />

            <TextInput control={control} name="weight" type="number" label="Weight (kg)" placeholder="Enter weight in kg" />
            <UploadMedia control={control} name="media_object_id" mediaObject={pet?.media_object} />

            <div>
                <Label htmlFor="vaccination_status">Vaccination Status *</Label>
                <SelectInput
                    control={control}
                    name="vaccination_status"
                    options={[
                        { value: "Yes", label: "Yes" },
                        { value: "No", label: "No" },
                        { value: "Partial", label: "Partial" },
                    ]}
                    placeholder="Select vaccination status"
                />
            </div>

            <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <TextAreaInput id="notes" control={control} name="notes" placeholder="Any additional information about your pet..." rows={3} />
                {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (pet ? "Updating..." : "Creating...") : pet ? "Update Pet" : "Create Pet"}
                </Button>
            </div>
        </form>
    );
}
