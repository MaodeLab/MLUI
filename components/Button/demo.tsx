// components/Button/demo.tsx
import { Button } from './index';
import type { ButtonProps } from './types';

// 使用默认导出，更简洁
const demo = {
  component: Button,
  title: '按钮',
  description: '用于触发操作的基础按钮组件',
  category: '基础组件',
  examples: [
    {
      label: '主要按钮',
      props: { variant: 'primary', children: '主要按钮' } as ButtonProps
    },
    {
      label: '次要按钮',
      props: { variant: 'secondary', children: '次要按钮' } as ButtonProps
    },
    {
      label: '轮廓按钮',
      props: { variant: 'outline', children: '轮廓按钮' } as ButtonProps
    },
    {
      label: '小尺寸',
      props: { size: 'sm', children: '小按钮' } as ButtonProps
    },
    {
      label: '大尺寸',
      props: { size: 'lg', children: '大按钮' } as ButtonProps
    },
    {
      label: '禁用状态',
      props: { disabled: true, children: '禁用按钮' } as ButtonProps
    }
  ]
};

export default demo;