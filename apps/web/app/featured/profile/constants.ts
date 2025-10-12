export const ENDPOINTS = {
    getProfile: {
        url: "/api/settings/profile",
        method: "GET",
    },
    updateProfile: {
        url: "/api/settings/profile",
        method: "PUT",
    },
    patchProfile: {
        url: "/api/settings/profile",
        method: "PATCH",
    },
} as const;
