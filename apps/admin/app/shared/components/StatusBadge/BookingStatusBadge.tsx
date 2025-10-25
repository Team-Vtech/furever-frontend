import { BookingStatus } from "@furever/types";
import { Badge, badgeVariants, VariantProps } from "@furever/ui/components/badge";

const statusStyles: Record<BookingStatus, VariantProps<typeof badgeVariants>["variant"]> = {
    [BookingStatus.PENDING]: "warning",
    [BookingStatus.CONFIRMED]: "info",
    [BookingStatus.IN_PROGRESS]: "secondary",
    [BookingStatus.COMPLETED]: "success",
    [BookingStatus.CANCELLED]: "danger",
};

const statusLabels: Record<BookingStatus, string> = {
    [BookingStatus.PENDING]: "Pending",
    [BookingStatus.CONFIRMED]: "Confirmed",
    [BookingStatus.IN_PROGRESS]: "In Progress",
    [BookingStatus.COMPLETED]: "Completed",
    [BookingStatus.CANCELLED]: "Cancelled",
};

interface BookingStatusBadgeProps {
    status: BookingStatus;
    className?: string;
}

export const BookingStatusBadge = ({ status, className }: BookingStatusBadgeProps) => {
    const variant = statusStyles[status] || "secondary";
    const label = statusLabels[status] || status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <Badge variant={variant} className={className}>
            {label}
        </Badge>
    );
};
