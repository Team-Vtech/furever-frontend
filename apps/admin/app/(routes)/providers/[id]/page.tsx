import { EditProviderScreen } from '../../../featured/providers/screens/EditProviderScreen/EditProviderScreen';
import { ProvidersClient } from '../../../featured/providers/clients/providers.client';
import { notFound } from 'next/navigation';
import { server } from '@/app/shared/utils/http.server.utils';
import { JsonResponse } from '@/app/shared/types/general';
import { Provider } from '@furever/types';

export default async function EditProviderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = await getProviderById(id);
  if (!provider) {
    return notFound();
  }
  return <EditProviderScreen provider={provider.data.data} />;
}

async function getProviderById(id: string) {
  return await (
    await server()
  ).get<JsonResponse<Provider>>(`/admin/providers/${id}`);
}
