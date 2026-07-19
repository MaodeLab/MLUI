// components/Radio/types.ts
export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}