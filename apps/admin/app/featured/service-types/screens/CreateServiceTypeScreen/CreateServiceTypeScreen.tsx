"use client";

import { ServiceTypeFormValues } from "@/app/(routes)/api/service-types/schema";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useRouter } from "next/navigation";
import { ServiceTypeForm } from "../../components/ServiceTypeForm/ServiceTypeForm";
import { useCreateServiceTypeMutation } from "../../hooks/useServiceTypeQueries";

export function CreateServiceTypeScreen() {
    const router = useRouter();
    const createServiceTypeMutation = useCreateServiceTypeMutation();

    const handleSubmit = async (data: ServiceTypeFormValues) => {
        try {
            await createServiceTypeMutation.mutateAsync(data);
            router.push("/service-types");
        } catch {
            toastUtils.error.create("Failed to create service type");
        }
    };

    return <ServiceTypeForm onSubmit={handleSubmit} isLoading={createServiceTypeMutation.isPending} />;
}
