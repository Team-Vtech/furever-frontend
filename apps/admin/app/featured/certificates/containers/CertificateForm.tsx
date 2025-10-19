"use client";

import { CertificateFormValues, certificateSchema, getCertificateDefaultValues } from "@/app/(routes)/api/certificates/certificates.schema";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Certificate, CertificateCategory } from "@furever/types";
import { Button } from "@furever/ui/components/button";
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
        control,
    } = formMethods;

    const handleFormSubmit = (data: CertificateFormValues) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <TextInput label="Name" required control={control} name="name" placeholder="Enter name" />

                    <TextAreaInput label="Description" required control={control} name="description" placeholder="Enter description" rows={4} />

                    <SelectInput
                        required
                        control={control}
                        name="category"
                        options={Object.values(CertificateCategory).map((certificate) => ({
                            label: certificate.charAt(0).toUpperCase() + certificate.slice(1),
                            value: certificate,
                        }))}
                        label="Category"
                    />
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
