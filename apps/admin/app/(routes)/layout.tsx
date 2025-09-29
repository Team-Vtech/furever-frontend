import { JsonResponse } from "@furever/types/general";
import { PermissionsProvider } from "../shared/providers/PermissionsProvider";
import { server } from "../shared/utils/http.server.utils";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const permissionsResponse = await fetchUserPermissions();
    const userPermissions = permissionsResponse?.data?.data || [];
    return <PermissionsProvider permissions={userPermissions}>{children}</PermissionsProvider>;
}
async function fetchUserPermissions() {
    try {
        return await (await server()).get<JsonResponse<string[]>>("/admin/user/permissions");
    } catch {
        return null;
    }
}
