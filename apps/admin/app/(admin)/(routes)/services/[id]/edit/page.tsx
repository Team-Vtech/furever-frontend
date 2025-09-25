import { Suspense } from "react";
import { EditServiceScreen } from "../../../../featured/services/screens/EditServiceScreen/EditServiceScreen";
import { server } from "@/app/shared/utils/http.server.utils";
import { PaginatedJsonResponse } from "@/app/shared/types/general";
import { Service } from "@furever/types";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service?.data.data) {
    return <div>Service not found</div>;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditServiceScreen service={service.data.data} />
    </Suspense>
  );
}

async function getServiceById(id: number) {
  try {
    return await (
      await server()
    ).get<PaginatedJsonResponse<Service>>(`/admin/services/${id}`);
  } catch (error) {
    return null;
  }
}
