import { Badge, badgeVariants, VariantProps } from "@furever/ui/components/badge";

type ProviderStatus = "pending" | "approved" | "rejected" | "inactive";

const statusStyles: Record<ProviderStatus, VariantProps<typeof badgeVariants>["variant"]> = {
    pending: "warning",
    approved: "success",
    rejected: "danger",
    inactive: "secondary",
};

const statusLabels: Record<ProviderStatus, string> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    inactive: "Inactive",
};

interface ProviderStatusBadgeProps {
    status: ProviderStatus;
    className?: string;
}

export const ProviderStatusBadge = ({ status, className }: ProviderStatusBadgeProps) => {
    const variant = statusStyles[status] || "secondary";
    const label = statusLabels[status] || status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <Badge variant={variant} className={className}>
            {label}
        </Badge>
    );
};
