import { GeneralStatus } from "@furever/types";
import { Badge, badgeVariants, VariantProps } from "@furever/ui/components/badge";

const statusStyles: Record<GeneralStatus, VariantProps<typeof badgeVariants>["variant"]> = {
    [GeneralStatus.ACTIVE]: "success",
    [GeneralStatus.DISABLED]: "warning",
};

const statusLabels: Record<GeneralStatus, string> = {
    [GeneralStatus.ACTIVE]: "Active",
    [GeneralStatus.DISABLED]: "Disabled",
};

interface GeneralStatusBadgeProps {
    status: GeneralStatus;
    className?: string;
}

export const GeneralStatusBadge = ({ status, className }: GeneralStatusBadgeProps) => {
    const variant = statusStyles[status] || "secondary";
    const label = statusLabels[status] || status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <Badge variant={variant} className={className}>
            {label}
        </Badge>
    );
};
