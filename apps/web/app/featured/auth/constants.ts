export const ENDPOINTS = {
    register: {
        url: "/api/auth/register",
        method: "POST",
    },
    login: {
        url: "/api/auth/signin",
        method: "POST",
    },
    changePassword: {
        url: "/api/settings/password",
        method: "PUT",
    },
    forgotPassword: {
        url: "/api/auth/forgot-password",
        method: "POST",
    },
    resetPassword: {
        url: "/api/auth/reset-password",
        method: "POST",
    },
} as const;
