"use client";

import { CertificateFormValues, certificateSchema, getCertificateDefaultValues } from "@/app/(routes)/api/certificates/certificates.schema";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Certificate, CertificateCategory } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

interface CertificateFormProps {
    certificate?: Certificate;
    onSubmit: (data: CertificateFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function CertificateForm({ certificate, onSubmit, onCancel, isLoading }: CertificateFormProps) {
    const defaultValues = getCertificateDefaultValues(certificate);
    const formMethods = useForm<CertificateFormValues>({
        resolver: zodResolver(certificateSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
    } = formMethods;

    const category = watch("category");

    const handleFormSubmit = (data: CertificateFormValues) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Name *
                        </Label>
                        <TextInput id="name" name="name" control={control} placeholder="Enter name" className="mt-1" />
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
                        <Label htmlFor="category">Category</Label>
                        <SelectInput
                            control={control}
                            name="category"
                            options={Object.values(CertificateCategory).map((certificate) => ({
                                label: certificate.charAt(0).toUpperCase() + certificate.slice(1),
                                value: certificate,
                            }))}
                        />

                        {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t pt-6">
                    {onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : certificate ? "Update Certificate" : "Create Certificate"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
