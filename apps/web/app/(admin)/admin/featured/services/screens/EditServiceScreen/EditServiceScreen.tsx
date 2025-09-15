"use client";

import {
  useServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../hooks/useServiceQueries";
import { ServiceForm } from "../../components/ServiceForm/ServiceForm";
import { CreateServiceSchema } from "../../../../(routes)/api/services/schema";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { DeleteRecordDialog } from "../../../../shared/components/DeleteRecordDialog/DeleteRecordDialog";

type CreateServiceInput = z.infer<typeof CreateServiceSchema>;

type EditServiceScreenProps = {
  serviceId: string;
};

export function EditServiceScreen({ serviceId }: EditServiceScreenProps) {
  const router = useRouter();
  const { data: service, isLoading, isError } = useServiceQuery(serviceId);
  const updateServiceMutation = useUpdateServiceMutation();
  const deleteServiceMutation = useDeleteServiceMutation();

  const handleSubmit = (data: CreateServiceInput) => {
    updateServiceMutation.mutate(
      { id: serviceId, data },
      {
        onSuccess: () => {
          router.push("/admin/services");
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteServiceMutation.mutate(id, {
      onSuccess: () => {
        router.push("/admin/services");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading service...</p>
        </div>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading service
          </h2>
          <p className="text-sm text-muted-foreground">
            The service could not be found or there was an error loading it.
          </p>
        </div>
      </div>
    );
  }

  // Transform service data to match form expectations
  const initialData = {
    name: service.data.name,
    description: service.data.description,
    price: parseFloat(service.data.price),
    duration: service.data.duration_minutes,
    status: service.data.is_active
      ? ("active" as const)
      : ("inactive" as const),
    categories: [], // Assuming categories will be populated from API
    imageUrl: "",
  };

  return (
    <div className="space-y-6">
      {/* Header with Delete Button */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Edit Service</h1>
          <p className="text-muted-foreground">
            Update the service details or delete it permanently.
          </p>
        </div>
        <DeleteRecordDialog
          recordName={service.data.name}
          recordId={serviceId}
          onDelete={handleDelete}
          isDeleting={deleteServiceMutation.isPending}
          triggerText="Delete Service"
        />
      </div>

      {/* Service Form */}
      <ServiceForm
        mode="edit"
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={updateServiceMutation.isPending}
      />
    </div>
  );
}
