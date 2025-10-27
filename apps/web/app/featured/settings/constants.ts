export const ENDPOINTS = {
    getLocations: {
        url: "/api/locations",
        method: "GET",
    },
    createLocation: {
        url: "/api/locations",
        method: "POST",
    },
    updateLocation: {
        url: "/api/locations",
        method: "PUT",
    },
    deleteLocation: {
        url: "/api/locations",
        method: "DELETE",
    },
} as const;
