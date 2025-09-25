"use client";

import { useRouter } from "next/navigation";
import { ServiceTypeForm } from "../components/ServiceTypeForm";
import { useCreateServiceTypeMutation } from "../hooks/useServiceTypeQueries";
import { CreateServiceTypeData } from "../types";
import { toast } from "sonner";

export function CreateServiceTypeScreen() {
  const router = useRouter();
  const createServiceTypeMutation = useCreateServiceTypeMutation();

  const handleSubmit = async (data: CreateServiceTypeData) => {
    try {
      await createServiceTypeMutation.mutateAsync(data);
      router.push("/service-types");
    } catch (error) {
      toast.error("Failed to create service type");
    }
  };

  return (
    <ServiceTypeForm
      mode="create"
      onSubmit={handleSubmit}
      isLoading={createServiceTypeMutation.isPending}
    />
  );
}
