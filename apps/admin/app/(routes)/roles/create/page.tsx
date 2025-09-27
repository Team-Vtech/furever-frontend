import { PageLayout } from '@/app/shared/components/PageLayout/PageLayout';
import { CreateRoleScreen } from '../../../featured/roles/screens/CreateRoleScreen/CreateRoleScreen';
import { server } from '@/app/shared/utils/http.server.utils';
import { PaginatedJsonResponse } from '@/app/shared/types/general';
import { Permission } from '@furever/types';

export default async function CreateRolePage() {
  const permissions = await getPermissions();

  return (
    <PageLayout
      title="Create Role"
      description="Add a new role to the system"
      breadcrumbs={[
        { label: 'Roles', href: '/roles' },
        { label: 'Create' },
      ]}
    >
      <CreateRoleScreen permissions={permissions?.data.data.data ?? []} />
    </PageLayout>
  );
}

async function getPermissions() {
  try {
    return await (
      await server()
    ).get<
      PaginatedJsonResponse<{
        data: Permission[];
      }>
    >(`/admin/permissions`);
  } catch (error) {
    return null;
  }
}
