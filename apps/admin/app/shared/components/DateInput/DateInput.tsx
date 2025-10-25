import { Button } from "@furever/ui/components/button";
import { Calendar } from "@furever/ui/components/calendar";
import { Label } from "@furever/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@furever/ui/components/popover";
import { cn } from "@furever/ui/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";
import { ReactElement } from "react";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

interface DateInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions<TFieldValues>;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    optional?: boolean;
    description?: string;
    id?: string;
    iconProps?: {
        name: keyof typeof dynamicIconImports;
        size: number;
        color: string;
        className?: string;
        position?: "left" | "right";
    };
}

function DateInputComponent<TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    rules,
    label,
    placeholder = "Pick a date",
    className = "",
    disabled = false,
    optional = false,
    description,
    id,
    iconProps = undefined,
    ...props
}: DateInputProps<TFieldValues>) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className="flex w-full flex-col justify-between">
                    {label && (
                        <Label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
                            {label}
                            {optional && <span className="ml-1 text-gray-400">(Optional)</span>}
                        </Label>
                    )}

                    {description && <p className="mb-1 text-xs text-gray-500">{description}</p>}

                    <div className="relative">
                        {iconProps ? iconProps.position == "left" ? <DynamicIcon {...iconProps} /> : null : null}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id={id || name}
                                    disabled={disabled}
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
                                        error ? "border-red-500" : "border-gray-300",
                                        className,
                                    )}
                                    {...props}
                                >
                                    <span className={cn("truncate", !field.value && "text-gray-500")}>
                                        {field.value ? format(field.value, "PPP") : <span className="text-gray-500">{placeholder}</span>}
                                    </span>
                                    <CalendarIcon className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value || undefined}
                                    onSelect={(date) => field.onChange(format(date!, "yyyy-MM-dd"))}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {iconProps ? iconProps.position == "right" ? <DynamicIcon {...iconProps} /> : null : null}
                    </div>

                    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                </div>
            )}
        />
    );
}

// Create the properly typed export
export const DateInput = DateInputComponent as <TFieldValues extends FieldValues = FieldValues>(props: DateInputProps<TFieldValues>) => ReactElement;
