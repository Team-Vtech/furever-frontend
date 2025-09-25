export const ENDPOINTS = {
  getPetTypes: {
    url: "/api/pet-types",
    method: "get",
  },
  createPetType: {
    url: "/api/pet-types",
    method: "post",
  },
  updatePetType: {
    url: (id: string) => `/api/pet-types/${id}`,
    method: "put",
  },
  deletePetType: {
    url: (id: string) => `/api/pet-types/${id}`,
    method: "delete",
  },
} as const;
