import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, PaginatedJsonResponse, Permission, Role } from "@furever/types";
import { Suspense } from "react";
import { EditRoleScreen } from "../../../../featured/roles/screens/EditRoleScreen/EditRoleScreen";

interface EditRolePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditRolePage({ params }: EditRolePageProps) {
    const { id } = await params;

    if (!id) {
        return <div>Role not found</div>;
    }

    const role = await getRoleById(id);
    const permissions = await getPermissions();
    if (!role) {
        return <div>Role not found</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditRoleScreen role={role.data.data} permissions={permissions?.data.data.data ?? []} />
        </Suspense>
    );
}

async function getRoleById(id: string) {
    try {
        return await (await server()).get<JsonResponse<Role>>(`/admin/roles/${id}`);
    } catch {
        return null;
    }
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
    } catch {
        return null;
    }
}
