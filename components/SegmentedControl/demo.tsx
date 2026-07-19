// components/SegmentedControl/demo.tsx
import { SegmentedControl } from './index';
import type { SegmentedControlProps } from './types';

const demo = {
  component: SegmentedControl,
  title: '分段控制器',
  description: '用于在不同视图或选项间切换',
  category: '导航组件',
  examples: [
    {
      label: '默认状态',
      props: {
        options: [
          { label: '每日', value: 'daily' },
          { label: '每周', value: 'weekly' },
          { label: '每月', value: 'monthly' },
        ],
        defaultValue: 'daily',
        onChange: (value) => console.log('选中:', value)
      } as SegmentedControlProps
    },
    {
      label: '自定义选项',
      props: {
        options: [
          { label: '列表', value: 'list' },
          { label: '网格', value: 'grid' },
          { label: '卡片', value: 'card' },
        ],
        defaultValue: 'grid',
        onChange: (value) => console.log('选中:', value)
      } as SegmentedControlProps
    }
  ]
};

export default demo;