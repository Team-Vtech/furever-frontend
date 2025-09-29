"use client";

// create a context to provide permissions to components
import { createContext, useContext } from "react";

type PermissionsContextType = {
    permissions: string[] | null;
    hasPermission: (permissionName: string) => boolean;
};

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider = ({ permissions, children }: { children: React.ReactNode; permissions: string[] }) => {
    const hasPermission = (permissionName: string) => {
        console.log(permissionName);
        if (!permissions) return false;
        return permissions.some((perm) => perm === permissionName);
    };

    return <PermissionsContext.Provider value={{ permissions, hasPermission }}>{children}</PermissionsContext.Provider>;
};

export function useAuthPermissions() {
    const context = useContext(PermissionsContext);
    if (context === undefined) {
        throw new Error("useAuthPermissions must be used within a PermissionsProvider");
    }

    return context;
}
