"use client";

import { useRouter } from "next/navigation";
import { ServiceTypeForm } from "../components/ServiceTypeForm";
import {
  useServiceTypeQuery,
  useUpdateServiceTypeMutation,
} from "../hooks/useServiceTypeQueries";
import { UpdateServiceTypeData } from "../types";
import { toast } from "sonner";

interface EditServiceTypeScreenProps {
  serviceTypeId: string;
}

export function EditServiceTypeScreen({
  serviceTypeId,
}: EditServiceTypeScreenProps) {
  const router = useRouter();
  const { data: serviceType, isLoading: isLoadingServiceType } =
    useServiceTypeQuery(serviceTypeId);
  const updateServiceTypeMutation = useUpdateServiceTypeMutation();

  const handleSubmit = async (data: UpdateServiceTypeData) => {
    try {
      await updateServiceTypeMutation.mutateAsync({
        id: serviceTypeId,
        data,
      });
      router.push("/admin/service-types");
    } catch (error) {
      toast.error("Failed to update service type");
    }
  };

  if (isLoadingServiceType) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!serviceType?.data) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Service type not found
          </h2>
          <p className="text-gray-600 mt-2">
            The service type you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ServiceTypeForm
      mode="edit"
      initialData={serviceType.data}
      onSubmit={handleSubmit}
      isLoading={updateServiceTypeMutation.isPending}
    />
  );
}
