// components/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button/types';
export { SegmentedControl } from './SegmentedControl';
export type { SegmentedControlProps, SegmentedOption } from './SegmentedControl/types';
export { Stepper } from './Stepper';
export type { StepperProps } from './Stepper/types';

import buttonDemo from './Button/demo';
import segmentedControlDemo from './SegmentedControl/demo';
import stepperDemo from './Stepper/demo';

export const componentDemos = [
  buttonDemo,
  segmentedControlDemo,
  stepperDemo,
] as const;

export type ComponentDemo = typeof componentDemos[number];