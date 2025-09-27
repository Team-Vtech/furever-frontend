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

