"use client";
import { useAuthPermissions } from "../../providers/PermissionsProvider";

export function Authorize({ children, permission, condition }: { children: React.ReactNode; permission: string; condition?: boolean }) {
    const { hasPermission } = useAuthPermissions();
    if (!hasPermission(permission) && !condition) {
        return null;
    }
    return <>{children}</>;
}
