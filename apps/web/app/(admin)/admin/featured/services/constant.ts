export const ENDPOINTS = {
  getServices: {
    url: "/admin/api/services",
    method: "get",
  },
  createService: {
    url: "/admin/api/services",
    method: "post",
  },
  updateService: {
    url: (id: string) => `/admin/api/services/${id}`,
    method: "put",
  },
} as const;
