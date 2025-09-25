export type FilterType =
  | "text"
  | "select"
  | "multi-select"
  | "date"
  | "date-range"
  | "number"
  | "boolean";

export interface FilterOption {
  label: string;
  value: string | number | boolean;
}

export interface FilterConfig {
  key: string;
  type: FilterType;
  label: string;
  placeholder?: string;
  options?: FilterOption[];
  defaultValue?: any;
  width?: "sm" | "md" | "lg" | "xl";
}

export interface FilterValue {
  [key: string]: any;
}

export interface FilterProps {
  config: FilterConfig;
  value: any;
  onChange: (value: any) => void;
}
