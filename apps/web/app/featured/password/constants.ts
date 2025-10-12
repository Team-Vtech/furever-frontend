export const ENDPOINTS = {
    changePassword: {
        url: "/api/settings/password",
        method: "PUT",
    },
    forgotPassword: {
        url: "/api/auth/forgot-password",
        method: "POST",
    },
} as const;
