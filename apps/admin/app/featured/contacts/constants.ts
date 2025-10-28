export const ENDPOINTS = {
    getContacts: {
        url: "/api/contacts",
        method: "GET",
    },
    getContact: {
        url: "/api/contacts",
        method: "GET",
    },
    markAsRead: {
        url: "/api/contacts",
        method: "PATCH",
    },
    markAsUnread: {
        url: "/api/contacts",
        method: "PATCH",
    },
} as const;
