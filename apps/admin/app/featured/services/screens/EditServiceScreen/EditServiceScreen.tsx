"use client";

import { ServiceFormValues } from "@/app/(routes)/api/services/services.schema";
import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Addon, PetType, Provider, Service, ServiceType } from "@furever/types";
import { ServiceForm } from "../../containers/ServiceForm";
import { useDeleteServiceMutation } from "./hooks/useDeleteServiceMutation";
import { useUpdateServiceMutation } from "./hooks/useUpdateServiceMutation";

type EditServiceScreenProps = {
    service: Service;
    serviceTypes: ServiceType[];
    petTypes: PetType[];
    providers: Provider[];
    addons: Addon[];
};

export function EditServiceScreen({ service, serviceTypes, petTypes, providers, addons }: EditServiceScreenProps) {
    const { isUpdating, updateService } = useUpdateServiceMutation();
    const { deleteService, isDeleting } = useDeleteServiceMutation();

    const handleSubmit = (data: ServiceFormValues) => {
        updateService({ id: service.id, data });
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
                <Authorize permissions={["delete any services", "delete own services"]}>
                    <DeleteRecordDialog isDeleting={isDeleting} onDelete={deleteService} recordId={service.id} recordName={service.name} />
                </Authorize>
            }
        >
            <div className="container mx-auto px-4 py-8">
                <ServiceForm
                    onSubmit={handleSubmit}
                    isLoading={isUpdating}
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
