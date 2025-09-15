import { cn } from "@furever/ui/lib/utils";
import { HTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export function InputError({
  error,
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { error?: FieldError }) {
  return error?.message ? (
    <p
      {...props}
      className={cn("text-sm text-red-600 dark:text-red-400", className)}
    >
      {error.message}
    </p>
  ) : null;
}
