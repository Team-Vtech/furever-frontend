import { EditServiceTypeScreen } from '../../../../featured/service-types/screens/EditServiceTypeScreen';
import { JsonResponse } from '@/app/shared/types/general';
import { server } from '@/app/shared/utils/http.server.utils';
import { ServiceType } from '@furever/types';

interface EditServiceTypePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServiceTypePage({
  params,
}: EditServiceTypePageProps) {
  const { id } = await params;

  if (!id) {
    return <div>Service Type not found</div>;
  }

  const serviceType = await getServiceTypeById(id);
  if (!serviceType) {
    return <div>Service Type not found</div>;
  }

  return <EditServiceTypeScreen serviceType={serviceType.data.data} />;
}

async function getServiceTypeById(id: string) {
  try {
    return await (
      await server()
    ).get<JsonResponse<ServiceType>>(`/admin/service-types/${id}`);
  } catch (error) {
    return null;
  }
}
