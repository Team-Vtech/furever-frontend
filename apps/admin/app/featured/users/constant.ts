export const ENDPOINTS = {
  getUsers: {
    url: "/api/users",
    method: "get",
  },
  createUser: {
    url: "/api/users",
    method: "post",
  },
  updateUser: {
    url: (id: string) => `/api/users/${id}`,
    method: "put",
  },
  deleteUser: {
    url: (id: string) => `/api/users/${id}`,
    method: "delete",
  },
} as const;

export const USER_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;
