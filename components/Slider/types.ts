// components/Slider/types.ts
export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  showTooltip?: boolean;
  label?: string;
  formatValue?: (value: number) => string;
}