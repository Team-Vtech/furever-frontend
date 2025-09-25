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
    url: (id: string) => `/api/service-types/${id}`,
    method: "get",
  },
  updateServiceType: {
    url: (id: string) => `/api/service-types/${id}`,
    method: "put",
  },
  deleteServiceType: {
    url: (id: string) => `/api/service-types/${id}`,
    method: "delete",
  },
} as const;
