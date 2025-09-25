export const ENDPOINTS = {
  getRoles: {
    url: "/api/roles",
    method: "get",
  },
  createRole: {
    url: "/api/roles",
    method: "post",
  },
  updateRole: {
    url: (id: string) => `/api/roles/${id}`,
    method: "patch",
  },
  deleteRole: {
    url: (id: string) => `/api/roles/${id}`,
    method: "delete",
  },
  getRole: {
    url: (id: string) => `/api/roles/${id}`,
    method: "get",
  },
} as const;

export const ROLE_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;
