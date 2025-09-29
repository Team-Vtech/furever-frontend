"use client";

import { ServiceFormValues } from "@/app/(routes)/api/services/services.schema";
import { Addon, PetType, Provider, ServiceType } from "@furever/types";
import { ServiceForm } from "../../containers/ServiceForm";
import { useCreateServiceMutation } from "./hooks/useCreateServiceMutation";

type CreateServiceScreenProps = {
    serviceTypes: ServiceType[];
    petTypes: PetType[];
    providers: Provider[];
    addons: Addon[];
};
export function CreateServiceScreen({ serviceTypes, petTypes, providers, addons }: CreateServiceScreenProps) {
    const { createService, isPending } = useCreateServiceMutation();

    const handleSubmit = (data: ServiceFormValues) => {
        createService(data);
    };

    return (
        <ServiceForm
            onSubmit={handleSubmit}
            isLoading={isPending}
            serviceTypes={serviceTypes}
            petTypes={petTypes}
            providers={providers}
            addons={addons}
        />
    );
}
