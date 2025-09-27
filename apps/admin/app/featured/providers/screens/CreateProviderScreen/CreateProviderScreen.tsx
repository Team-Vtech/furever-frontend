'use client';

import { useRouter } from 'next/navigation';
import { ProviderForm } from '../../containers/ProviderForm';
import { ProviderFormValues } from '@/app/(routes)/api/providers/providers.schema';
import { useProviderQueries } from '../../hooks/useProviderQueries';

export function CreateProviderScreen() {
  const router = useRouter();
  const { createProviderMutation } = useProviderQueries();

  const handleSubmit = (data: ProviderFormValues) => {
    createProviderMutation.mutate(data, {
      onSuccess: () => {
        router.push('/providers');
      },
    });
  };

  const handleCancel = () => {
    router.push('/providers');
  };

  return (
    <ProviderForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={createProviderMutation.isPending}
    />
  );
}
