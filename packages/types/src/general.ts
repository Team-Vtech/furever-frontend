import { RegisterOptions } from "module";
import { FieldValues, Path, Control } from "react-hook-form";

export type JsonResponse<T = Record<string, unknown>> = {
  data: T;
  status: string;
  message: string;
};

export interface PaginatedJsonResponse<T = Record<string, string>> {
  status: string;
  data: {
    pagination: Pagination;
  } & T;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  next_page: number;
  prev_page: number;
  has_more: boolean;
  per_page: number;
}
type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

export type ControlledInputProps<T extends FieldValues> =
  InputControllerType<T>;
