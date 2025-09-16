"use client";

import { useRouter } from "next/navigation";
import { AddonForm } from "../../containers/AddonForm";
import { useCreateAddonMutation } from "../../hooks/useAddonQueries";
import { CreateAddonFormValues } from "../../../../(routes)/api/addons/addons.schema";

export function CreateAddonScreen() {
  const router = useRouter();
  const createAddonMutation = useCreateAddonMutation();

  const handleSubmit = (data: CreateAddonFormValues) => {
    createAddonMutation.mutate(data, {
      onSuccess: () => {
        router.push("/admin/addons");
      },
    });
  };

  const handleCancel = () => {
    router.push("/admin/addons");
  };

  return (
    <AddonForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={createAddonMutation.isPending}
    />
  );
}
