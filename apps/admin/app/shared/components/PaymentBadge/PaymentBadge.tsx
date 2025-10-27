"use client";

import { PaymentStatus } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { AlertCircle, CheckCircle, Clock, RefreshCw, XCircle } from "lucide-react";

interface PaymentBadgeProps {
    status: PaymentStatus;
    className?: string;
    showIcon?: boolean;
}

const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
        case PaymentStatus.COMPLETED:
            return {
                label: "Completed",
                variant: "default" as const,
                className: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
                icon: CheckCircle,
                iconClassName: "text-green-600",
            };
        case PaymentStatus.PENDING:
            return {
                label: "Pending",
                variant: "secondary" as const,
                className: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
                icon: Clock,
                iconClassName: "text-yellow-600",
            };
        case PaymentStatus.PROCESSING:
            return {
                label: "Processing",
                variant: "secondary" as const,
                className: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
                icon: RefreshCw,
                iconClassName: "text-blue-600 animate-spin",
            };
        case PaymentStatus.FAILED:
            return {
                label: "Failed",
                variant: "destructive" as const,
                className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
                icon: XCircle,
                iconClassName: "text-red-600",
            };
        case PaymentStatus.REFUNDED:
            return {
                label: "Refunded",
                variant: "outline" as const,
                className: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
                icon: RefreshCw,
                iconClassName: "text-purple-600",
            };
        case PaymentStatus.CANCELLED:
            return {
                label: "Cancelled",
                variant: "destructive" as const,
                className: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
                icon: XCircle,
                iconClassName: "text-gray-600",
            };
        case PaymentStatus.UNKNOWN:
        default:
            return {
                label: "Unknown",
                variant: "outline" as const,
                className: "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100",
                icon: AlertCircle,
                iconClassName: "text-gray-500",
            };
    }
};

export function PaymentBadge({ status, className = "", showIcon = true }: PaymentBadgeProps) {
    const config = getStatusConfig(status);
    const IconComponent = config.icon;

    return (
        <Badge variant={config.variant} className={`${config.className} ${className}`}>
            <div className="flex items-center gap-1">
                {showIcon && <IconComponent className={`h-3 w-3 ${config.iconClassName}`} />}
                <span>{config.label}</span>
            </div>
        </Badge>
    );
}

// Convenience components for specific statuses
export function CompletedPaymentBadge({ className }: { className?: string }) {
    return <PaymentBadge status={PaymentStatus.COMPLETED} className={className} />;
}

export function PendingPaymentBadge({ className }: { className?: string }) {
    return <PaymentBadge status={PaymentStatus.PENDING} className={className} />;
}

export function ProcessingPaymentBadge({ className }: { className?: string }) {
    return <PaymentBadge status={PaymentStatus.PROCESSING} className={className} />;
}

export function FailedPaymentBadge({ className }: { className?: string }) {
    return <PaymentBadge status={PaymentStatus.FAILED} className={className} />;
}

export function RefundedPaymentBadge({ className }: { className?: string }) {
    return <PaymentBadge status={PaymentStatus.REFUNDED} className={className} />;
}

export function CancelledPaymentBadge({ className }: { className?: string }) {
    return <PaymentBadge status={PaymentStatus.CANCELLED} className={className} />;
}
