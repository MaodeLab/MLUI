import { HTMLAttributes } from 'react';

export interface SegmentedOption {
  label: string;
  value: string;
}

export interface SegmentedControlProps extends HTMLAttributes<HTMLDivElement> {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}