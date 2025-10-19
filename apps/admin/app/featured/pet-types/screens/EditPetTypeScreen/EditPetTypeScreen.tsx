"use client";

import { PetTypeFormValues } from "@/app/(routes)/api/pet-types/schema";
import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { PetType } from "@furever/types";
import { useRouter } from "next/navigation";
import { PetTypeForm } from "../../containers/PetTypeForm";
import { useDeletePetTypeMutation, useUpdatePetTypeMutation } from "../../hooks/use-pet-types";

type EditPetTypeScreenProps = {
    petType: PetType;
};

export default function EditPetTypeScreen({ petType }: EditPetTypeScreenProps) {
    const router = useRouter();
    const updateMutation = useUpdatePetTypeMutation();
    const deletePetType = useDeletePetTypeMutation();

    const handleSubmit = async (data: PetTypeFormValues) => {
        try {
            await updateMutation.mutateAsync({
                id: petType.id,
                data,
            });
            toastUtils.success.update("Pet type");
            router.push("/pet-types");
        } catch {
            toastUtils.error.update("Pet type");
        }
    };

    return (
        <PageLayout
            title={`Edit Pet Type: ${petType?.name || ""}`}
            breadcrumbs={[
                { label: "Pet Types", href: "/pet-types" },
                {
                    label: "Edit Pet Type",
                    href: `/pet-types/${petType?.id}/edit`,
                },
            ]}
            actions={
                <Authorize permissions={["delete any pet types"]}>
                    <DeleteRecordDialog
                        isDeleting={deletePetType.isPending}
                        onDelete={async () => {
                            try {
                                await deletePetType.mutateAsync(petType.id);
                                toastUtils.success.create("Pet type deleted successfully");
                                router.push("/pet-types");
                            } catch {
                                toastUtils.error.create("Failed to delete pet type");
                            }
                        }}
                        recordId={petType.id}
                        recordName={petType.name}
                    />
                </Authorize>
            }
        >
            <div className="container mx-auto px-4 py-8">
                <PetTypeForm onSubmit={handleSubmit} isLoading={updateMutation.isPending} petType={petType} />
            </div>
        </PageLayout>
    );
}
