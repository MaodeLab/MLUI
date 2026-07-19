// components/Switch/demo.tsx
import { Switch } from './index';
import type { SwitchProps } from './types';

const demo = {
  component: Switch,
  title: '开关',
  description: '用于开启或关闭某个功能',
  category: '数据录入',
  examples: [
    {
      label: '默认状态',
      props: {
        defaultChecked: false,
        onChange: (checked: boolean) => console.log('开关状态:', checked)
      } as SwitchProps
    },
    {
      label: '默认开启',
      props: {
        defaultChecked: true,
        onChange: (checked: boolean) => console.log('开关状态:', checked)
      } as SwitchProps
    },
    {
      label: '带标签 (右侧)',
      props: {
        label: '通知',
        defaultChecked: true,
        onChange: (checked: boolean) => console.log('通知:', checked)
      } as SwitchProps
    },
    {
      label: '带标签 (左侧)',
      props: {
        label: '自动保存',
        labelPosition: 'left',
        defaultChecked: false,
        onChange: (checked: boolean) => console.log('自动保存:', checked)
      } as SwitchProps
    },
    {
      label: '小尺寸',
      props: {
        size: 'sm',
        defaultChecked: true,
        onChange: (checked: boolean) => console.log('开关状态:', checked)
      } as SwitchProps
    },
    {
      label: '大尺寸',
      props: {
        size: 'lg',
        defaultChecked: true,
        onChange: (checked: boolean) => console.log('开关状态:', checked)
      } as SwitchProps
    },
    {
      label: '禁用状态',
      props: {
        defaultChecked: true,
        disabled: true,
      } as SwitchProps
    }
  ]
};

export default demo;