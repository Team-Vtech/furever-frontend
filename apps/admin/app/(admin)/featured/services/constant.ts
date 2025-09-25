export const ENDPOINTS = {
  getServices: {
    url: "/api/services",
    method: "get",
  },
  createService: {
    url: "/api/services",
    method: "post",
  },
  updateService: {
    url: (id: string) => `/api/services/${id}`,
    method: "put",
  },
} as const;
