import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@furever/ui/components/button";

interface ListingErrorStateProps {
  /**
   * The resource name that failed to load (e.g., "bookings", "users", "providers")
   */
  resourceName: string;
  /**
   * Optional custom error message. If not provided, uses default message.
   */
  message?: string;
  /**
   * Optional retry function. If provided, shows a retry button.
   */
  onRetry?: () => void;
  /**
   * Optional custom action button content
   */
  action?: React.ReactNode;
  /**
   * Size variant for the error state
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
}

export function ListingErrorState({
  resourceName,
  message,
  onRetry,
  action,
  size = "default",
}: ListingErrorStateProps) {
  const defaultMessage = `Error loading ${resourceName}`;

  const sizeClasses = {
    sm: "h-48",
    default: "h-64",
    lg: "h-80",
  };

  const textSizes = {
    sm: { title: "text-base", description: "text-xs" },
    default: { title: "text-lg", description: "text-sm" },
    lg: { title: "text-xl", description: "text-base" },
  };

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
      <div className="text-center space-y-4 max-w-md mx-auto">
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>

        <div className="space-y-2">
          <h2 className={`font-semibold text-red-600 ${textSizes[size].title}`}>
            {message || defaultMessage}
          </h2>
          <p className={`text-muted-foreground ${textSizes[size].description}`}>
            Something went wrong while loading the data. Please try again.
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          {action}
        </div>
      </div>
    </div>
  );
}
