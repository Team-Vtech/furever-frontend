export const ENDPOINTS = {
  getAddons: {
    url: "/admin/api/addons",
    method: "get",
  },
  createAddon: {
    url: "/admin/api/addons",
    method: "post",
  },
  updateAddon: {
    url: (id: string) => `/admin/api/addons/${id}`,
    method: "put",
  },
  deleteAddon: {
    url: (id: string) => `/admin/api/addons/${id}`,
    method: "delete",
  },
} as const;

export const ADDON_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
] as const;
