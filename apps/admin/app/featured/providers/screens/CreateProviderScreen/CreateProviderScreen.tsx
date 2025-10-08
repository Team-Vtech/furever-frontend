"use client";

import { ProviderFormValues } from "@/app/(routes)/api/providers/providers.schema";
import { Certificate } from "@furever/types/index";
import { ProviderForm } from "../../containers/ProviderForm";
import { useCreateProvider } from "./hooks/useCreateProvider";

type CreateProviderScreenProps = {
    certificates: Certificate[];
};

export function CreateProviderScreen({ certificates }: CreateProviderScreenProps) {
    const { createProvider, isCreating } = useCreateProvider();

    const handleSubmit = (data: ProviderFormValues) => {
        createProvider(data);
    };

    return <ProviderForm onSubmit={handleSubmit} isLoading={isCreating} certificates={certificates} />;
}
