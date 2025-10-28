export const ENDPOINTS = {
    getServiceTypes: {
        url: "/api/service-types",
        method: "get",
    },
    createServiceType: {
        url: "/api/service-types",
        method: "post",
    },
    getServiceType: {
        url: (id: number) => `/api/service-types/${id}`,
        method: "get",
    },
    updateServiceType: {
        url: (id: number) => `/api/service-types/${id}`,
        method: "put",
    },
    deleteServiceType: {
        url: (id: number) => `/api/service-types/${id}`,
        method: "delete",
    },
} as const;
