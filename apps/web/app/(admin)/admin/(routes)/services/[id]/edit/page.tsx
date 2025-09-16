import { Suspense } from "react";
import { EditServiceScreen } from "../../../../featured/services/screens/EditServiceScreen/EditServiceScreen";
import { ServicesClient } from "@/app/(admin)/admin/featured/services/clients/services.client";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getService(id);
  if (!service.data) {
    return <div>Service not found</div>;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditServiceScreen service={service.data} />
    </Suspense>
  );
}

async function getService(id: string) {
  return await ServicesClient.getService(id);
}
