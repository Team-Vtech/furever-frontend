"use client";

import { useRouter } from "next/navigation";
import { ProviderForm } from "../../containers/ProviderForm";
import { useProviderQueries } from "../../hooks/useProviderQueries";
import { CreateProviderFormValues } from "../../../../(routes)/api/providers/providers.schema";

export function CreateProviderScreen() {
  const router = useRouter();
  const { createProviderMutation } = useProviderQueries();

  const handleSubmit = (data: CreateProviderFormValues) => {
    createProviderMutation.mutate(data, {
      onSuccess: () => {
        router.push("/admin/providers");
      },
    });
  };

  const handleCancel = () => {
    router.push("/admin/providers");
  };

  return (
    <ProviderForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={createProviderMutation.isPending}
    />
  );
}
