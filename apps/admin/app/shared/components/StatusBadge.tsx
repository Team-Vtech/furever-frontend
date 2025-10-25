import { GeneralStatus } from "@furever/types";
import { Badge, badgeVariants, VariantProps } from "@furever/ui/components/badge";

const statusStyles: Record<GeneralStatus, VariantProps<typeof badgeVariants>["variant"]> = {
    [GeneralStatus.ACTIVE]: "success",
    [GeneralStatus.DISABLED]: "warning",
    [GeneralStatus.DELETED]: "danger",
};

interface StatusBadgeProps {
    status: GeneralStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    const style = statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-300";
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    return <Badge className={style}>{label}</Badge>;
};
