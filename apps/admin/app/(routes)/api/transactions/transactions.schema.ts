import { z } from "zod";

// Schema for transaction status updates (if needed in the future)
export const transactionStatusSchema = z.object({
    status: z.enum(["pending", "completed", "failed", "refunded"]),
});

// Schema for transaction filters
export const transactionFiltersSchema = z.object({
    page: z.coerce.number().min(1).optional(),
    per_page: z.coerce.number().min(1).max(100).optional(),
    status: z.enum(["pending", "completed", "failed", "refunded"]).optional(),
    user_id: z.coerce.number().positive().optional(),
    search: z.string().optional(),
    sort_by: z.enum(["id", "amount", "created_at", "processed_at"]).optional(),
    sort_order: z.enum(["asc", "desc"]).optional(),
    date_from: z.string().optional(),
    date_to: z.string().optional(),
    payment_method: z.string().optional(),
});

export type TransactionStatusValues = z.infer<typeof transactionStatusSchema>;
export type TransactionFiltersValues = z.infer<typeof transactionFiltersSchema>;
