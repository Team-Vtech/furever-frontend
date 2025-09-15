"use client";
import { Textarea } from "@furever/ui/components/textarea";
import { ControlledInputProps } from "@/types";
import { FieldValues, useController } from "react-hook-form";

type TextAreaInputProps<T extends FieldValues> =
  React.ComponentProps<"textarea"> & ControlledInputProps<T>;

export function TextAreaInput<T extends FieldValues>(
  props: TextAreaInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;
  const { field } = useController({ control, name, rules });
  return (
    <Textarea
      autoCapitalize="none"
      defaultValue={(field.value as string) || ""}
      {...inputProps}
      {...field}
    />
  );
}
