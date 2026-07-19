// components/SegmentedControl/types.ts
import { HTMLAttributes } from 'react';

export interface SegmentedOption {
  label: string;
  value: string;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  width?: string | number;
  height?: string | number;
  id?: string;
  style?: React.CSSProperties;
}