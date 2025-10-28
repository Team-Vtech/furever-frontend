"use client";
import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Certificate, Provider } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { getProviderDefaultValues, ProviderFormValues, providerSchema } from "../../../(routes)/api/providers/providers.schema";
import { BusinessInformationSection } from "../components/BusinessInformationSection";
import { CertificatesSection } from "../components/CertificatesSection";
import { ContactInformationSection } from "../components/ContactInformationSection";
import { LocationInformationSection } from "../components/LocationInformationSection";
import { ProfileMediaSection } from "../components/ProfileMediaSection";
import { WorkingHoursSection } from "../components/WorkingHoursSection";
import { PROVIDER_STATUS_OPTIONS } from "../constants";

interface ProviderFormProps {
    provider?: Provider;
    onSubmit: (data: ProviderFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
    certificates: Certificate[];
}

export function ProviderForm({ provider, onSubmit, onCancel, isLoading, certificates = [] }: ProviderFormProps) {
    const defaultValues = getProviderDefaultValues(provider);
    const formMethods = useForm<ProviderFormValues>({
        resolver: zodResolver(providerSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
        register,
    } = formMethods;

    const {
        fields: certificateFields,
        append: appendCertificate,
        remove: removeCertificate,
    } = useFieldArray({
        control,
        name: "certificates",
    });

    const {
        fields: workingHourFields,
        append: appendWorkingHour,
        remove: removeWorkingHour,
    } = useFieldArray({
        control,
        name: "working_hours",
    });

    const watchedStatus = watch("status");

    const handleFormSubmit = (data: ProviderFormValues) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <TextInput id="location.id" name="location.id" control={control} className="mt-1 hidden" />

                <div className="space-y-4">
                    <BusinessInformationSection control={control} />
                    <ContactInformationSection control={control} />
                    <LocationInformationSection control={control} />
                    <ProfileMediaSection control={control} provider={provider} isLoading={isLoading} />

                    <SelectInput
                        control={control}
                        name="status"
                        label="Status"
                        options={PROVIDER_STATUS_OPTIONS.map((option) => ({
                            label: option.label,
                            value: option.value,
                        }))}
                    />
                </div>

                <WorkingHoursSection
                    control={control}
                    register={register}
                    watch={watch}
                    errors={errors}
                    workingHourFields={workingHourFields}
                    appendWorkingHour={appendWorkingHour}
                    removeWorkingHour={removeWorkingHour}
                />

                <CertificatesSection
                    control={control}
                    errors={errors}
                    certificateFields={certificateFields}
                    appendCertificate={appendCertificate}
                    removeCertificate={removeCertificate}
                    certificates={certificates}
                    provider={provider}
                />

                <div className="flex justify-end gap-3 border-t pt-6">
                    {onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                            Cancel
                        </Button>
                    )}
                    <Authorize permissions={provider?.id ? ["edit any providers", "edit own providers"] : ["create any providers"]} condition={false}>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : provider ? "Update Provider" : "Create Provider"}
                        </Button>
                    </Authorize>
                </div>
            </form>
        </FormProvider>
    );
}
