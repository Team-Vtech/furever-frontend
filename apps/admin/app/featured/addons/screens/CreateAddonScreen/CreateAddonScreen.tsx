'use client';

import { useRouter } from 'next/navigation';
import { AddonForm } from '../../containers/AddonForm';
import { useCreateAddon } from './hooks/useCreateAddon';
import { AddonFormValues } from '@/app/(routes)/api/addons/addons.schema';

export function CreateAddonScreen() {
  const router = useRouter();
  const { createAddon, isCreating } = useCreateAddon();

  const handleSubmit = (data: AddonFormValues) => {
    createAddon(data, {
      onSuccess: () => {
        router.push('/addons');
      },
    });
  };

  const handleCancel = () => {
    router.push('/addons');
  };

  return (
    <AddonForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={isCreating}
    />
  );
}
