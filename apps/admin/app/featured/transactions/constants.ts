export const ENDPOINTS = {
    getTransactions: {
        url: "/api/transactions",
        method: "get",
    },
    getTransaction: {
        url: (id: string) => `/api/transactions/${id}`,
        method: "get",
    },
} as const;

export const TRANSACTION_STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
    { value: "refunded", label: "Refunded" },
];

export const PAYMENT_METHOD_OPTIONS = [
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank_transfer", label: "Bank Transfer" },
];
