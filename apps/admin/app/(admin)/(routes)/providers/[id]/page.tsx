import { EditProviderScreen } from "../../../featured/providers/screens/EditProviderScreen/EditProviderScreen";
import { ProvidersClient } from "../../../featured/providers/clients/providers.client";
import { notFound } from "next/navigation";

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
  return <EditProviderScreen provider={provider.data} />;
}

async function getProviderById(id: string) {
  return ProvidersClient.getProvider(id);
}
