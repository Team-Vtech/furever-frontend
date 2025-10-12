export const ENDPOINTS = {
    register: {
        url: "/api/auth/register",
        method: "POST",
    },
    login: {
        url: "/api/auth/signin",
        method: "POST",
    },
    forgotPassword: {
        url: "/api/auth/forgot-password",
        method: "POST",
    },
} as const;
