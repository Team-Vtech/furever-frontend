"use client";

import { useCreateServiceMutation } from "../../hooks/useServiceQueries";
import { useRouter } from "next/navigation";
import { ServiceForm } from "../../containers/ServiceForm";
import { ServiceFormValues } from "@/app/(routes)/api/services/services.schema";
import { Addon, PetType, Provider, ServiceType } from "@furever/types";

type CreateServiceScreenProps = {
  serviceTypes: ServiceType[];
  petTypes: PetType[];
  providers: Provider[];
  addons: Addon[];
};
export function CreateServiceScreen({
  serviceTypes,
  petTypes,
  providers,
  addons,
}: CreateServiceScreenProps) {
  const router = useRouter();
  const createServiceMutation = useCreateServiceMutation();

  const handleSubmit = (data: ServiceFormValues) => {
    try {
      createServiceMutation.mutate(data, {
        onSuccess: () => {
          router.push("/services");
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
      serviceTypes={serviceTypes}
      petTypes={petTypes}
      providers={providers}
      addons={addons}
    />
  );
}
