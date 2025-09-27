import { SidebarInset, SidebarProvider } from "@furever/ui/components/sidebar";
import { cn } from "@furever/ui/lib/utils";
import { PermissionsProvider } from "../shared/providers/PermissionsProvider";
import { server } from "../shared/utils/http.server.utils";
import { JsonResponse } from "../shared/types/general";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch user permissions on the server side
  const permissionsResponse = await fetchUserPermissions();
  const userPermissions = permissionsResponse?.data?.data || [];
  return (
    <PermissionsProvider permissions={userPermissions}>
      {children}
    </PermissionsProvider>
  );
}
async function fetchUserPermissions() {
  return await (
    await server()
  ).get<JsonResponse<string[]>>("/admin/user/permissions");
}
