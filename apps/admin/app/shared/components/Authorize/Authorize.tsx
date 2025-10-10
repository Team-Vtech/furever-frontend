"use client";
import { useAuthPermissions } from "../../providers/PermissionsProvider";

export function Authorize({ children, permissions, condition }: { children: React.ReactNode; permissions: string[]; condition?: boolean }) {
    const { hasPermission } = useAuthPermissions();
    if (!permissions.some(permission => hasPermission(permission)) && !condition) {
        return null;
    }
    return <>{children}</>;
}
