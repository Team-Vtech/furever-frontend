"use client";

import { DeleteRecordDialog } from "@/app/(admin)/admin/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/(admin)/admin/shared/components/PageLayout/PageLayout";
import { useRouter } from "next/navigation";
import { ProviderFormValues } from "../../../../(routes)/api/providers/providers.schema";
import { ProviderForm } from "../../containers/ProviderForm";
import { useProviderDelete } from "./hooks/useProviderDelete";
import { useProviderMutation } from "./hooks/useProviderMutation";
import { Provider } from "@/app/(admin)/admin/shared/types/models.types";

interface EditProviderScreenProps {
  provider: Provider;
}

export function EditProviderScreen({ provider }: EditProviderScreenProps) {
  const router = useRouter();

  const { updateProvider, isUpdating } = useProviderMutation();
  const { deleteProvider, isDeleting } = useProviderDelete();
  const handleSubmit = (data: ProviderFormValues) => {
    updateProvider(
      { id: provider.id, data },
      {
        onSuccess: () => {
          router.push("/admin/providers");
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/admin/providers");
  };

  const handleDelete = () => {
    deleteProvider(provider.id, {
      onSuccess: () => {
        router.push("/admin/providers");
      },
    });
  };

  return (
    <PageLayout
      title={`Update the details for "${provider.business_name}"`}
      actions={
        <DeleteRecordDialog
          recordId={provider.id}
          recordName={provider.business_name}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      }
      breadcrumbs={[
        { label: "Providers", href: "/admin/providers" },
        {
          label: provider.business_name,
          href: `/admin/providers/${provider.id}`,
        },
        { label: "Edit", href: "#" },
      ]}
    >
      <ProviderForm
        provider={provider}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isUpdating}
      />
    </PageLayout>
  );
}
