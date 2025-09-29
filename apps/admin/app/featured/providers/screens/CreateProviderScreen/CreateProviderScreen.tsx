"use client";

import { ProviderFormValues } from "@/app/(routes)/api/providers/providers.schema";
import { ProviderForm } from "../../containers/ProviderForm";
import { useCreateProvider } from "./hooks/useCreateProvider";

export function CreateProviderScreen() {
    const { createProvider, isCreating } = useCreateProvider();

    const handleSubmit = (data: ProviderFormValues) => {
        createProvider(data);
    };

    return <ProviderForm onSubmit={handleSubmit} isLoading={isCreating} />;
}
