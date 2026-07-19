// components/index.ts
export { Button } from './Button';
export { SegmentedControl } from './SegmentedControl';
export { Stepper } from './Stepper';
export { Radio } from './Radio';
export { Checkbox } from './Checkbox';
export { Switch } from './Switch';
export { Input } from './Input';

import buttonDemo from './Button/demo';
import segmentedControlDemo from './SegmentedControl/demo';
import stepperDemo from './Stepper/demo';
import radioDemo from './Radio/demo';
import checkboxDemo from './Checkbox/demo';
import switchDemo from './Switch/demo';
import inputDemo from './Input/demo';

export const componentDemos = [
  buttonDemo,
  segmentedControlDemo,
  stepperDemo,
  radioDemo,
  checkboxDemo,
  switchDemo,
  inputDemo,
] as const;

export type ComponentDemo = typeof componentDemos[number];