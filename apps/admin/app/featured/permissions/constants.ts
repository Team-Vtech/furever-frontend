export const ENDPOINTS = {
    getPermissions: {
        url: "/api/permissions",
        method: "get",
    },
    createPermission: {
        url: "/api/permissions",
        method: "post",
    },
    updatePermission: {
        url: (id: string) => `/api/permissions/${id}`,
        method: "patch",
    },
    deletePermission: {
        url: (id: string) => `/api/permissions/${id}`,
        method: "delete",
    },
    getPermission: {
        url: (id: string) => `/api/permissions/${id}`,
        method: "get",
    },
} as const;

export const PERMISSION_STATUS_OPTIONS = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
] as const;
