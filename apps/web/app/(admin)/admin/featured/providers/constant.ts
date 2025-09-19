export const ENDPOINTS = {
  getProviders: {
    url: "/admin/api/providers",
    method: "get",
  },
  createProvider: {
    url: "/admin/api/providers",
    method: "post",
  },
  updateProvider: {
    url: (id: string) => `/admin/api/providers/${id}`,
    method: "put",
  },
  deleteProvider: {
    url: (id: string) => `/admin/api/providers/${id}`,
    method: "delete",
  },
} as const;

export const PROVIDER_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "inactive", label: "Inactive" },
] as const;
