// components/Checkbox/demo.tsx
import { Checkbox } from './index';
import type { CheckboxProps } from './types';

const demo = {
  component: Checkbox,
  title: '复选框',
  description: '用于多个选项的选择',
  category: '数据录入',
  examples: [
    {
      label: '垂直排列',
      props: {
        options: [
          { label: '阅读并同意用户协议', value: 'agreement' },
          { label: '订阅邮件通知', value: 'email' },
          { label: '记住登录状态', value: 'remember' },
        ],
        defaultValue: ['agreement'],
        direction: 'vertical',
        onChange: (value: string[]) => console.log('选中:', value)
      } as CheckboxProps
    },
    {
      label: '水平排列',
      props: {
        options: [
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' },
          { label: '橙子', value: 'orange' },
        ],
        defaultValue: ['apple', 'banana'],
        direction: 'horizontal',
        onChange: (value: string[]) => console.log('选中:', value)
      } as CheckboxProps
    },
    {
      label: '小尺寸',
      props: {
        options: [
          { label: '选项 A', value: 'a' },
          { label: '选项 B', value: 'b' },
          { label: '选项 C', value: 'c' },
        ],
        defaultValue: ['a'],
        size: 'sm',
        direction: 'horizontal',
        onChange: (value: string[]) => console.log('选中:', value)
      } as CheckboxProps
    },
    {
      label: '大尺寸',
      props: {
        options: [
          { label: '选项 A', value: 'a' },
          { label: '选项 B', value: 'b' },
        ],
        defaultValue: ['a'],
        size: 'lg',
        direction: 'horizontal',
        onChange: (value: string[]) => console.log('选中:', value)
      } as CheckboxProps
    },
    {
      label: '禁用状态',
      props: {
        options: [
          { label: '可选', value: 'enabled' },
          { label: '禁用', value: 'disabled', disabled: true },
        ],
        defaultValue: ['enabled'],
        direction: 'horizontal',
        onChange: (value: string[]) => console.log('选中:', value)
      } as CheckboxProps
    },
    {
      label: '全部禁用',
      props: {
        options: [
          { label: '选项 1', value: '1' },
          { label: '选项 2', value: '2' },
        ],
        defaultValue: ['1'],
        disabled: true,
        direction: 'horizontal',
      } as CheckboxProps
    }
  ]
};

export default demo;