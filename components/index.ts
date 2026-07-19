// components/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button/types';
export { SegmentedControl } from './SegmentedControl';
export type { SegmentedControlProps, SegmentedOption } from './SegmentedControl/types';

// 导入所有组件的 demo 配置（使用默认导入）
import buttonDemo from './Button/demo';
import segmentedControlDemo from './SegmentedControl/demo';

// 统一导出配置列表
export const componentDemos = [
  buttonDemo,
  segmentedControlDemo,
] as const;

// 类型推导
export type ComponentDemo = typeof componentDemos[number];