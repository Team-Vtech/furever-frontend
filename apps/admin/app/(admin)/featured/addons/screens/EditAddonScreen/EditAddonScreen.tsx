"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useAddonQuery,
  useDeleteAddonMutation,
  useUpdateAddonMutation,
} from "../../hooks/useAddonQueries";
import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { CreateAddonFormValues } from "@/app/(admin)/(routes)/api/addons/addons.schema";
import { AddonForm } from "../../containers/AddonForm";

interface EditAddonScreenProps {
  addonId: string;
}

export function EditAddonScreen({ addonId }: EditAddonScreenProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: addonData, isLoading, isError } = useAddonQuery(addonId);
  const updateAddonMutation = useUpdateAddonMutation();
  const deleteAddonMutation = useDeleteAddonMutation();

  const handleSubmit = (data: CreateAddonFormValues) => {
    updateAddonMutation.mutate(
      { id: addonId, data },
      {
        onSuccess: () => {
          router.push("/admin/addons");
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/admin/addons");
  };

  const handleDelete = () => {
    deleteAddonMutation.mutate(Number(addonId), {
      onSuccess: () => {
        router.push("/admin/addons");
      },
    });
    setShowDeleteDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Loading addon...</p>
        </div>
      </div>
    );
  }

  if (isError || !addonData?.data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading addon
          </h2>
          <p className="text-sm text-muted-foreground">
            Please try refreshing the page or go back to the addons list
          </p>
        </div>
      </div>
    );
  }

  const addon = addonData.data;

  return (
    <PageLayout
      title={`Update the details for "${addon.name}"`}
      actions={
        <DeleteRecordDialog
          recordId={addon.id}
          recordName={addon.name}
          onDelete={handleDelete}
          isDeleting={deleteAddonMutation.isPending}
        />
      }
      breadcrumbs={[
        { label: "Addons", href: "/admin/addons" },
        { label: addon.name, href: `/admin/addons/${addon.id}` },
        { label: "Edit", href: "#" },
      ]}
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <AddonForm
          addon={addon}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={updateAddonMutation.isPending}
        />
      </div>
    </PageLayout>
  );
}
