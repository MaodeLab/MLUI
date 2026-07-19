// components/Radio/demo.tsx
import { Radio } from './index';
import type { RadioProps } from './types';

const demo = {
  component: Radio,
  title: '单选按钮',
  description: '用于在多个选项中选择一个',
  category: '数据录入',
  examples: [
    {
      label: '垂直排列',
      props: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
        defaultValue: 'male',
        direction: 'vertical',
        onChange: (value: string) => console.log('选中:', value)
      } as RadioProps
    },
    {
      label: '水平排列',
      props: {
        options: [
          { label: '微信', value: 'wechat' },
          { label: '支付宝', value: 'alipay' },
          { label: '银行卡', value: 'bank' },
        ],
        defaultValue: 'wechat',
        direction: 'horizontal',
        onChange: (value: string) => console.log('选中:', value)
      } as RadioProps
    },
    {
      label: '小尺寸',
      props: {
        options: [
          { label: '选项 A', value: 'a' },
          { label: '选项 B', value: 'b' },
        ],
        defaultValue: 'a',
        size: 'sm',
        direction: 'horizontal',
        onChange: (value: string) => console.log('选中:', value)
      } as RadioProps
    },
    {
      label: '大尺寸',
      props: {
        options: [
          { label: '选项 A', value: 'a' },
          { label: '选项 B', value: 'b' },
        ],
        defaultValue: 'a',
        size: 'lg',
        direction: 'horizontal',
        onChange: (value: string) => console.log('选中:', value)
      } as RadioProps
    },
    {
      label: '禁用状态',
      props: {
        options: [
          { label: '可选', value: 'enabled' },
          { label: '禁用', value: 'disabled', disabled: true },
        ],
        defaultValue: 'enabled',
        direction: 'horizontal',
        onChange: (value: string) => console.log('选中:', value)
      } as RadioProps
    },
    {
      label: '全部禁用',
      props: {
        options: [
          { label: '选项 1', value: '1' },
          { label: '选项 2', value: '2' },
        ],
        defaultValue: '1',
        disabled: true,
        direction: 'horizontal',
      } as RadioProps
    }
  ]
};

export default demo;