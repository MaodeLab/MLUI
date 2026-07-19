// components/Checkbox/types.ts
export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckboxProps {
  options: CheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}