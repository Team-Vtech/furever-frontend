export const ENDPOINTS = {
  getPetTypes: {
    url: "/admin/api/pet-types",
    method: "get",
  },
  createPetType: {
    url: "/admin/api/pet-types",
    method: "post",
  },
  updatePetType: {
    url: (id: string) => `/admin/api/pet-types/${id}`,
    method: "put",
  },
  deletePetType: {
    url: (id: string) => `/admin/api/pet-types/${id}`,
    method: "delete",
  },
} as const;
