"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProviderForm } from "../../containers/ProviderForm";
import { useProviderQueries } from "../../hooks/useProviderQueries";
import { CreateProviderFormValues } from "../../../../(routes)/api/providers/providers.schema";
import { Button } from "@furever/ui/components/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@furever/ui/components/dialog";
import { PageLayout } from "@/app/(admin)/admin/shared/components/PageLayout/PageLayout";
import { DeleteRecordDialog } from "@/app/(admin)/admin/shared/components/DeleteRecordDialog/DeleteRecordDialog";

interface EditProviderScreenProps {
  providerId: string;
}

export function EditProviderScreen({ providerId }: EditProviderScreenProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { providerQuery, updateProviderMutation, deleteProviderMutation } =
    useProviderQueries();
  const { data: providerData, isLoading, isError } = providerQuery(providerId);

  const handleSubmit = (data: CreateProviderFormValues) => {
    updateProviderMutation.mutate(
      { id: providerId, data },
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
    deleteProviderMutation.mutate(Number(providerId), {
      onSuccess: () => {
        router.push("/admin/providers");
      },
    });
    setShowDeleteDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">
            Loading provider...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !providerData?.data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Error loading provider
          </h2>
          <p className="text-sm text-muted-foreground">
            Please try refreshing the page or go back to the providers list
          </p>
        </div>
      </div>
    );
  }

  const provider = providerData.data;

  return (
    <PageLayout
      title={`Update the details for "${provider.business_name}"`}
      actions={
        <DeleteRecordDialog
          recordId={provider.id}
          recordName={provider.business_name}
          onDelete={handleDelete}
          isDeleting={deleteProviderMutation.isPending}
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
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <ProviderForm
          provider={provider}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={updateProviderMutation.isPending}
        />
      </div>
    </PageLayout>
  );
}
