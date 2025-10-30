"use client";

import { ServiceTypeFormValues } from "@/app/(routes)/api/service-types/schema";
import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { ServiceType } from "@furever/types";
import { useRouter } from "next/navigation";
import { ServiceTypeForm } from "../../components/ServiceTypeForm/ServiceTypeForm";
import { useDeleteServiceTypeMutation, useUpdateServiceTypeMutation } from "../../hooks/useServiceTypeQueries";

interface EditServiceTypeScreenProps {
    serviceType: ServiceType;
}

export function EditServiceTypeScreen({ serviceType }: EditServiceTypeScreenProps) {
    const router = useRouter();

    const updateServiceTypeMutation = useUpdateServiceTypeMutation();
    const { deleteServiceType, isDeleting } = useDeleteServiceTypeMutation();

    const handleSubmit = async (data: ServiceTypeFormValues) => {
        try {
            await updateServiceTypeMutation.mutateAsync({
                id: serviceType.id,
                data,
            });
            router.push("/service-types");
        } catch {
            toastUtils.error.create("Failed to update service type");
        }
    };

    return (
        <PageLayout
            title={`Edit Service Type: ${serviceType.name}`}
            breadcrumbs={[{ label: "Service Types", href: "/service-types" }, { label: `Edit ${serviceType.name}` }]}
            actions={
                <Authorize permissions={["delete any service types"]}>
                    <DeleteRecordDialog
                        recordId={serviceType.id}
                        recordName={serviceType.name}
                        onDelete={deleteServiceType}
                        isDeleting={isDeleting}
                    />
                </Authorize>
            }
        >
            <ServiceTypeForm serviceType={serviceType} onSubmit={handleSubmit} isLoading={updateServiceTypeMutation.isPending} />
        </PageLayout>
    );
}
