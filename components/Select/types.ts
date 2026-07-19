// components/Select/types.ts
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  placeholder?: string;
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  searchable?: boolean;
  popupMatchWidth?: boolean;
  label?: string;
  error?: string;
  helperText?: string;
  clearable?: boolean;
  multiple?: boolean;
  maxTagCount?: number;
}