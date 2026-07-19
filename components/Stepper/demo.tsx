// components/Stepper/demo.tsx
import { Stepper } from './index';
import type { StepperProps } from './types';

const demo = {
  component: Stepper,
  title: '加减器',
  description: '用于数值的增加和减少操作',
  category: '数据录入',
  examples: [
    {
      label: '默认状态',
      props: {
        defaultValue: 0,
        onChange: (value: number) => console.log('当前值:', value)
      } as StepperProps
    },
    {
      label: '带限制 (0-10)',
      props: {
        defaultValue: 5,
        min: 0,
        max: 10,
        onChange: (value: number) => console.log('当前值:', value)
      } as StepperProps
    },
    {
      label: '步长为2',
      props: {
        defaultValue: 0,
        step: 2,
        onChange: (value: number) => console.log('当前值:', value)
      } as StepperProps
    },
    {
      label: '小尺寸',
      props: {
        defaultValue: 0,
        size: 'sm',
        onChange: (value: number) => console.log('当前值:', value)
      } as StepperProps
    },
    {
      label: '大尺寸',
      props: {
        defaultValue: 0,
        size: 'lg',
        onChange: (value: number) => console.log('当前值:', value)
      } as StepperProps
    },
    {
      label: '禁用状态',
      props: {
        defaultValue: 5,
        disabled: true,
      } as StepperProps
    }
  ]
};

export default demo;