'use client';

import { useRouter } from 'next/navigation';
import { RoleFormValues } from '../../../../(routes)/api/roles/roles.schema';
import { useCreateRole } from '../../hooks/use-roles';
import { toast } from 'sonner';
import { RoleForm } from '../../containers/RoleForm';
import { Permission } from '@furever/types';

export type CreateRoleScreenProps = {
  permissions: Permission[];
};

export function CreateRoleScreen({ permissions }: CreateRoleScreenProps) {
  const router = useRouter();
  const createRoleMutation = useCreateRole();

  const handleSubmit = async (data: RoleFormValues) => {
    try {
      await createRoleMutation.mutateAsync(data);
      toast.success('Role created successfully');
      router.push('/roles');
    } catch (error) {
      toast.error('Failed to create role');
      console.error('Error creating role:', error);
    }
  };

  const handleCancel = () => {
    router.push('/roles');
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <RoleForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createRoleMutation.isPending}
        permissions={permissions}
      />
    </div>
  );
}
