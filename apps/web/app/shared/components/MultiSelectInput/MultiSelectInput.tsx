import { ReactElement } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Label } from "@furever/ui/components/label";
import { MultipleSelector, Option } from "@furever/ui/components/multi-select";

interface MultiSelectInputProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  optional?: boolean;
  description?: string;
  options: Option[];
  maxSelected?: number;
  hideClearAllButton?: boolean;
  emptyIndicator?: React.ReactNode;
  loadingIndicator?: React.ReactNode;
  creatable?: boolean;
  groupBy?: string;
  triggerSearchOnFocus?: boolean;
  delay?: number;
  onSearch?: (value: string) => Promise<Option[]>;
  onSearchSync?: (value: string) => Option[];
  hidePlaceholderWhenSelected?: boolean;
  badgeClassName?: string;
  selectFirstItem?: boolean;
}

function MultiSelectInputComponent<
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  rules,
  label,
  placeholder = "Select options",
  className = "",
  disabled = false,
  optional = false,
  description,
  options,
  maxSelected = 3,
  hideClearAllButton = false,
  emptyIndicator,
  loadingIndicator,
  creatable = false,
  groupBy,
  triggerSearchOnFocus = false,
  delay,
  onSearch,
  onSearchSync,
  hidePlaceholderWhenSelected = false,
  badgeClassName,
  selectFirstItem = true,
  ...props
}: MultiSelectInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          {label && (
            <Label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
              {optional && (
                <span className="text-gray-400 ml-1">(Optional)</span>
              )}
            </Label>
          )}

          {description && (
            <p className="text-xs text-gray-500 mb-1">{description}</p>
          )}

          <div className="relative">
            <MultipleSelector
              {...field}
              {...props}
              options={options}
              value={field.value || []}
              onChange={field.onChange}
              placeholder={placeholder}
              disabled={disabled}
              maxSelected={maxSelected}
              emptyIndicator={emptyIndicator}
              loadingIndicator={loadingIndicator}
              creatable={creatable}
              groupBy={groupBy}
              triggerSearchOnFocus={triggerSearchOnFocus}
              delay={delay}
              onSearch={onSearch}
              onSearchSync={onSearchSync}
              hidePlaceholderWhenSelected={hidePlaceholderWhenSelected}
              badgeClassName={badgeClassName}
              selectFirstItem={selectFirstItem}
              hideClearAllButton={hideClearAllButton}
              className={`
                ${error ? "border-red-500" : "border-gray-300"}
                ${className}
              `.trim()}
            />
          </div>

          {error && (
            <p className="mt-1 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

// Create the properly typed export
export const MultiSelectInput = MultiSelectInputComponent as <
  TFieldValues extends FieldValues = FieldValues,
>(
  props: MultiSelectInputProps<TFieldValues>
) => ReactElement;

export type { MultiSelectInputProps };
