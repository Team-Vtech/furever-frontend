"use client";

import { ServiceFormValues } from "@/app/(admin)/admin/(routes)/api/services/services.schema";
import { PageLayout } from "@/app/(admin)/admin/shared/components/PageLayout/PageLayout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeleteRecordDialog } from "../../../../shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { ServiceForm } from "../../containers/ServiceForm";
import {
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "../../hooks/useServiceQueries";
import { Service } from "../../types";

type EditServiceScreenProps = {
  service: Service;
};

export function EditServiceScreen({ service }: EditServiceScreenProps) {
  const router = useRouter();
  const updateServiceMutation = useUpdateServiceMutation();
  const deleteServiceMutation = useDeleteServiceMutation();

  const handleSubmit = (data: ServiceFormValues) => {
    updateServiceMutation.mutate(
      { id: service.id, data },
      {
        onSuccess: () => {
          router.push("/admin/services");
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteServiceMutation.mutate(id, {
      onSuccess: () => {
        router.push("/admin/services");
      },
    });
  };

  return (
    <PageLayout
      title={`Edit Service: ${service?.name || ""}`}
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Services", href: "/admin/services" },
        {
          label: "Edit Service",
          href: `/admin/services/${service?.id}/edit`,
        },
      ]}
      actions={
        <DeleteRecordDialog
          isDeleting={deleteServiceMutation.isPending}
          onDelete={async () => {
            try {
              await deleteServiceMutation.mutateAsync(service.id);
              toast.success("Service deleted successfully");
              router.push("/admin/services");
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
        />
      </div>
    </PageLayout>
  );
}
