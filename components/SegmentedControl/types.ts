// components/SegmentedControl/types.ts
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
  className?: string;
  width?: string | number;  // 新增：自定义宽度
  height?: string | number; // 新增：自定义高度
}