import { Permission } from "@furever/types";
import { PermissionsClient } from "../../../featured/permissions/clients/permissions.client";
import { EditPermissionScreen } from "../../../featured/permissions/screens/EditPermissionScreen/EditPermissionScreen";
import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse } from "@/app/shared/types/general";

interface EditPermissionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPermissionPage({
  params,
}: EditPermissionPageProps) {
  const { id } = await params;

  if (!id) {
    return <div>Permission not found</div>;
  }

  const permission = await getPermissionById(id);
  if (!permission) {
    return <div>Permission not found</div>;
  }
  return <EditPermissionScreen permission={permission.data.data} />;
}

async function getPermissionById(id: string) {
  try {
    return await (
      await server()
    ).get<JsonResponse<Permission>>(`/admin/permissions/${id}`);
  } catch (error) {
    return null;
  }
}
