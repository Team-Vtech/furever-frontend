export const ENDPOINTS = {
  getAddons: {
    url: "/api/addons",
    method: "get",
  },
  createAddon: {
    url: "/api/addons",
    method: "post",
  },
  updateAddon: {
    url: (id: string) => `/api/addons/${id}`,
    method: "put",
  },
  deleteAddon: {
    url: (id: string) => `/api/addons/${id}`,
    method: "delete",
  },
} as const;

export const ADDON_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
] as const;
