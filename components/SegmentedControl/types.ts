// components/SegmentedControl/types.ts
import { HTMLAttributes } from 'react';

export interface SegmentedOption {
  label: string;
  value: string;
}

// 移除 HTMLAttributes 继承，避免 onChange 类型冲突
export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  // 保留其他原生属性（除了 onChange）
  id?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}