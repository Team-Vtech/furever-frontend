import { Button } from '@furever/ui/components/button';
import { RolesListScreen } from '../../featured/roles/screens/RolesListScreen/RolesListScreen';
import { PageLayout } from '@/app/shared/components/PageLayout/PageLayout';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function RolesPage() {
  return (
    <PageLayout
      title="Roles"
      description="Manage system roles"
      breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Roles' }]}
      actions={
        <Button asChild>
          <Link href="/roles/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Service
          </Link>
        </Button>
      }
    >
      <RolesListScreen />
    </PageLayout>
  );
}
