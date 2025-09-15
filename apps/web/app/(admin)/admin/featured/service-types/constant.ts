export const ENDPOINTS = {
  getServiceTypes: {
    url: "/admin/api/service-types",
    method: "get",
  },
  createServiceType: {
    url: "/admin/api/service-types",
    method: "post",
  },
  getServiceType: {
    url: (id: string) => `/admin/api/service-types/${id}`,
    method: "get",
  },
  updateServiceType: {
    url: (id: string) => `/admin/api/service-types/${id}`,
    method: "put",
  },
  deleteServiceType: {
    url: (id: string) => `/admin/api/service-types/${id}`,
    method: "delete",
  },
} as const;
