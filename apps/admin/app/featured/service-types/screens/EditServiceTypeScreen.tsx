"use client";

import { ServiceTypeFormValues } from "@/app/(routes)/api/service-types/schema";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { ServiceType } from "@furever/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ServiceTypeForm } from "../components/ServiceTypeForm";
import { useUpdateServiceTypeMutation } from "../hooks/useServiceTypeQueries";

interface EditServiceTypeScreenProps {
  serviceType: ServiceType;
}

export function EditServiceTypeScreen({
  serviceType,
}: EditServiceTypeScreenProps) {
  const router = useRouter();

  const updateServiceTypeMutation = useUpdateServiceTypeMutation();

  const handleSubmit = async (data: ServiceTypeFormValues) => {
    try {
      await updateServiceTypeMutation.mutateAsync({
        id: serviceType.id,
        data,
      });
      router.push("/service-types");
    } catch (error) {
      toast.error("Failed to update service type");
    }
  };

  return (
    <PageLayout
      title={`Edit Service Type: ${serviceType.name}`}
      breadcrumbs={[
        { label: "Service Types", href: "/service-types" },
        { label: `Edit ${serviceType.name}` },
      ]}
    >
      <ServiceTypeForm
        serviceType={serviceType}
        onSubmit={handleSubmit}
        isLoading={updateServiceTypeMutation.isPending}
      />
    </PageLayout>
  );
}
