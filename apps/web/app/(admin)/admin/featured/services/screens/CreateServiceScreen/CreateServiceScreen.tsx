"use client";

import { useCreateServiceMutation } from "../../hooks/useServiceQueries";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ServiceForm } from "../../containers/ServiceForm";
import { ServiceFormValues } from "@/app/(admin)/admin/(routes)/api/services/services.schema";

export function CreateServiceScreen() {
  const router = useRouter();
  const createServiceMutation = useCreateServiceMutation();

  const handleSubmit = (data: ServiceFormValues) => {
    try {
      createServiceMutation.mutate(data, {
        onSuccess: () => {
          router.push("/admin/services");
        },
      });
    } catch (error) {
      console.error("Failed to create service", error);
    }
  };

  return (
    <ServiceForm
      onSubmit={handleSubmit}
      isLoading={createServiceMutation.isPending}
    />
  );
}
