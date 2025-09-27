"use client";

import { ServiceFormValues } from "@/app/(routes)/api/services/services.schema";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ServiceForm } from "../../containers/ServiceForm";
import {
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "../../hooks/useServiceQueries";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { Addon, PetType, Provider, Service, ServiceType } from "@furever/types";

type EditServiceScreenProps = {
  service: Service;
  serviceTypes: ServiceType[];
  petTypes: PetType[];
  providers: Provider[];
  addons: Addon[];
};

export function EditServiceScreen({
  service,
  serviceTypes,
  petTypes,
  providers,
  addons,
}: EditServiceScreenProps) {
  const router = useRouter();
  const updateServiceMutation = useUpdateServiceMutation();
  const deleteServiceMutation = useDeleteServiceMutation();

  const handleSubmit = (data: ServiceFormValues) => {
    updateServiceMutation.mutate(
      { id: service.id, data },
      {
        onSuccess: () => {
          router.push("/services");
        },
      }
    );
  };

  return (
    <PageLayout
      title={`Edit Service: ${service?.name || ""}`}
      breadcrumbs={[
        { label: "Services", href: "/services" },
        {
          label: "Edit Service",
          href: `/services/${service?.id}/edit`,
        },
      ]}
      actions={
        <DeleteRecordDialog
          isDeleting={deleteServiceMutation.isPending}
          onDelete={async () => {
            try {
              await deleteServiceMutation.mutateAsync(service.id);
              toast.success("Service deleted successfully");
              router.push("/services");
            } catch (error) {
              toast.error("Failed to delete service");
            }
          }}
          recordId={service.id}
          recordName={service.name}
        />
      }
    >
      <div className="container mx-auto px-4 py-8">
        <ServiceForm
          onSubmit={handleSubmit}
          isLoading={updateServiceMutation.isPending}
          service={service}
          serviceTypes={serviceTypes}
          petTypes={petTypes}
          providers={providers}
          addons={addons}
        />
      </div>
    </PageLayout>
  );
}
