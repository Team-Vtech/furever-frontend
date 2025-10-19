"use client";
import { useAuthPermissions } from "../../providers/PermissionsProvider";

export function Authorize({ children, permissions, condition }: { children: React.ReactNode; permissions: string[]; condition?: boolean }) {
    const { hasPermission } = useAuthPermissions();
    if (hasPermission(permissions) === false) {
        return null;
    }
    return <>{children}</>;
}
