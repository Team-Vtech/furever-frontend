import { GeneralStatus } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";

const statusStyles: Record<GeneralStatus, string> = {
    [GeneralStatus.ACTIVE]: "bg-green-100 text-green-800 border-green-300",
    [GeneralStatus.DISABLED]: "bg-yellow-100 text-yellow-800 border-yellow-300",
    [GeneralStatus.DELETED]: "bg-red-100 text-red-800 border-red-300",
};

interface StatusBadgeProps {
    status: GeneralStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    const style = statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-300";
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    return <Badge className={style}>{label}</Badge>;
};
