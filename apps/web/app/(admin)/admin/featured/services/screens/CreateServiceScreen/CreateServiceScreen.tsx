"use client";

import { useCreateServiceMutation } from "../../hooks/useServiceQueries";
import { ServiceForm } from "../../components/ServiceForm/ServiceForm";
import { CreateServiceSchema } from "../../../../(routes)/api/services/schema";
import { useRouter } from "next/navigation";
import { z } from "zod";

type CreateServiceInput = z.infer<typeof CreateServiceSchema>;

export function CreateServiceScreen() {
  const router = useRouter();
  const createServiceMutation = useCreateServiceMutation();

  const handleSubmit = (data: CreateServiceInput) => {
    createServiceMutation.mutate(data, {
      onSuccess: () => {
        router.push("/admin/services");
      },
    });
  };

  return (
    <ServiceForm
      mode="create"
      onSubmit={handleSubmit}
      isLoading={createServiceMutation.isPending}
    />
  );
}
