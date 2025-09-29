"use client";

import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Addon } from "@furever/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddonForm } from "../../containers/AddonForm";
import { useDeleteAddon } from "./hooks/useDeleteAddon";
import { useUpdateAddon } from "./hooks/useUpdateAddon";
import { AddonFormValues } from "@/app/(routes)/api/addons/addons.schema";

interface EditAddonScreenProps {
  addon: Addon;
}

export function EditAddonScreen({ addon }: EditAddonScreenProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { updateAddon, isUpdating } = useUpdateAddon();
  const { deleteAddon, isDeleting } = useDeleteAddon();

  const handleSubmit = (data: AddonFormValues) => {
    updateAddon(
      { id: addon.id, data },
      {
        onSuccess: () => {
          router.push("/addons");
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/addons");
  };

  const handleDelete = () => {
    deleteAddon(addon.id, {
      onSuccess: () => {
        router.push("/addons");
      },
    });
    setShowDeleteDialog(true);
  };

  return (
    <PageLayout
      title={`Update the details for "${addon.name}"`}
      actions={
        <DeleteRecordDialog
          recordId={addon.id}
          recordName={addon.name}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      }
      breadcrumbs={[
        { label: addon.name, href: `/addons/${addon.id}` },
        { label: "Edit", href: "#" },
      ]}
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <AddonForm
          addon={addon}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isUpdating}
        />
      </div>
    </PageLayout>
  );
}
