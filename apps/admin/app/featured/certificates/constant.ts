export const ENDPOINTS = {
    getCertificates: {
        url: "/api/certificates",
        method: "get",
    },
    createCertificate: {
        url: "/api/certificates",
        method: "post",
    },
    updateCertificates: {
        url: (id: number) => `/api/certificates/${id}`,
        method: "put",
    },
    deleteCertificates: {
        url: (id: number) => `/api/certificates/${id}`,
        method: "delete",
    },
} as const;
