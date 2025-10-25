"use client";
import { DateInput } from "@/app/shared/components/DateInput/DateInput";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { UploadMedia } from "@/app/shared/components/UploadMedia/UploadMedia";
import { Certificate, Provider } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Plus, Trash2 } from "lucide-react";
import { Control, FieldErrors } from "react-hook-form";
import { ProviderFormValues } from "../../../(routes)/api/providers/providers.schema";

interface CertificatesSectionProps {
    control: Control<ProviderFormValues>;
    errors: FieldErrors<ProviderFormValues>;
    certificateFields: Array<{ id: string }>;
    appendCertificate: (value: any) => void;
    removeCertificate: (index: number) => void;
    certificates: Certificate[];
    provider?: Provider;
}

export function CertificatesSection({
    control,
    errors,
    certificateFields,
    appendCertificate,
    removeCertificate,
    certificates,
    provider,
}: CertificatesSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Certificates</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        appendCertificate({
                            certificate_id: 0,
                            certificate_number: "",
                            issued_by: "",
                            issued_at: undefined,
                            expires_at: undefined,
                            media_object_id: undefined,
                            notes: "",
                        })
                    }
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certificate
                </Button>
            </div>

            {certificateFields.map((field, index) => (
                <div key={field.id} className="space-y-4 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-md font-medium text-gray-900">Certificate {index + 1}</h4>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeCertificate(index)}
                            className="text-red-600 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <SelectInput
                            name={`certificates.${index}.certificate_id`}
                            control={control}
                            placeholder="Enter certificate"
                            className="mt-1 w-full"
                            options={certificates.map((certificate) => ({
                                label: certificate.name,
                                value: certificate.id,
                            }))}
                            label="Certificate"
                        />

                        <TextInput
                            id={`certificates.${index}.certificate_number`}
                            name={`certificates.${index}.certificate_number`}
                            control={control}
                            placeholder="Enter certificate number"
                            className="mt-1"
                            label="Certificate Number"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <TextInput
                            id={`certificates.${index}.issued_by`}
                            name={`certificates.${index}.issued_by`}
                            control={control}
                            placeholder="Enter issuer"
                            className="mt-1"
                            label="Issued By"
                        />

                        <DateInput
                            id={`certificates.${index}.issued_at`}
                            name={`certificates.${index}.issued_at`}
                            control={control}
                            className="mt-1"
                            label="Issued At"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <DateInput
                            id={`certificates.${index}.expires_at`}
                            name={`certificates.${index}.expires_at`}
                            control={control}
                            className="mt-1"
                            label="Expires At"
                        />
                    </div>

                    <div>
                        <TextAreaInput
                            id={`certificates.${index}.notes`}
                            name={`certificates.${index}.notes`}
                            control={control}
                            placeholder="Enter notes"
                            rows={3}
                            className="mt-1"
                            label="Notes"
                        />
                    </div>

                    <div>
                        <Label className="text-sm font-medium text-gray-700">Certificate Document</Label>
                        <UploadMedia
                            control={control}
                            name={`certificates.${index}.media_object_id`}
                            mediaObject={provider?.certificates[index]?.media_object}
                            accept="image/png, image/jpeg,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                    </div>
                </div>
            ))}

            {certificateFields.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                    <p className="text-gray-500">No certificates added yet. Click "Add Certificate" to add one.</p>
                </div>
            )}
        </div>
    );
}
