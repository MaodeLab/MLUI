// components/index.ts
export { Button } from './Button';
export { SegmentedControl } from './SegmentedControl';
export { Stepper } from './Stepper';
export { Radio } from './Radio';
export { Checkbox } from './Checkbox';

import buttonDemo from './Button/demo';
import segmentedControlDemo from './SegmentedControl/demo';
import stepperDemo from './Stepper/demo';
import radioDemo from './Radio/demo';
import checkboxDemo from './Checkbox/demo';

export const componentDemos = [
  buttonDemo,
  segmentedControlDemo,
  stepperDemo,
  radioDemo,
  checkboxDemo,
] as const;

export type ComponentDemo = typeof componentDemos[number];