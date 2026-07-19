// components/Select/demo.tsx
import { Select } from './index';
import type { SelectProps } from './types';

const demo = {
  component: Select,
  title: '选择器',
  description: '用于从多个选项中选择一个',
  category: '数据录入',
  examples: [
    {
      label: '默认',
      props: {
        options: [
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' },
          { label: '橙子', value: 'orange' },
          { label: '葡萄', value: 'grape' },
        ],
        placeholder: '请选择水果',
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '带默认值',
      props: {
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' },
        ],
        defaultValue: 'shanghai',
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '带标签',
      props: {
        label: '城市',
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
        ],
        placeholder: '请选择城市',
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '可搜索',
      props: {
        label: '城市',
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' },
          { label: '杭州', value: 'hangzhou' },
          { label: '成都', value: 'chengdu' },
          { label: '武汉', value: 'wuhan' },
        ],
        placeholder: '搜索并选择城市',
        searchable: true,
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '可清除',
      props: {
        options: [
          { label: '选项 A', value: 'a' },
          { label: '选项 B', value: 'b' },
          { label: '选项 C', value: 'c' },
        ],
        placeholder: '可选择清除',
        clearable: true,
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '下拉框与输入框不同宽',
      props: {
        options: [
          { label: '非常长的选项名称示例', value: 'long-1' },
          { label: '另一个很长的选项名', value: 'long-2' },
        ],
        placeholder: '点击看下拉框宽度',
        popupMatchWidth: false,
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '小尺寸',
      props: {
        options: [
          { label: '选项 1', value: '1' },
          { label: '选项 2', value: '2' },
          { label: '选项 3', value: '3' },
        ],
        size: 'sm',
        placeholder: '小尺寸',
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '大尺寸',
      props: {
        options: [
          { label: '选项 1', value: '1' },
          { label: '选项 2', value: '2' },
          { label: '选项 3', value: '3' },
        ],
        size: 'lg',
        placeholder: '大尺寸',
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '错误状态',
      props: {
        label: '城市',
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
        ],
        placeholder: '请选择城市',
        error: '请选择城市',
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '禁用状态',
      props: {
        options: [
          { label: '选项 1', value: '1' },
          { label: '选项 2', value: '2' },
        ],
        defaultValue: '1',
        disabled: true,
      } as SelectProps
    },
    {
      label: '禁用选项',
      props: {
        options: [
          { label: '可用选项', value: 'enabled' },
          { label: '禁用选项', value: 'disabled', disabled: true },
          { label: '另一个可用', value: 'enabled2' },
        ],
        placeholder: '禁用的选项不可选',
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '全宽',
      props: {
        options: [
          { label: '选项 1', value: '1' },
          { label: '选项 2', value: '2' },
          { label: '选项 3', value: '3' },
        ],
        placeholder: '全宽选择器',
        fullWidth: true,
        onChange: (value: string) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '多选',
      props: {
        label: '水果',
        options: [
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' },
          { label: '橙子', value: 'orange' },
          { label: '葡萄', value: 'grape' },
          { label: '西瓜', value: 'watermelon' },
          { label: '草莓', value: 'strawberry' },
        ],
        defaultValue: ['apple', 'banana'],
        multiple: true,
        placeholder: '请选择水果',
        onChange: (value: string[]) => console.log('选中:', value)
      } as SelectProps
    },
    {
      label: '多选 - 限制标签显示数量',
      props: {
        label: '水果',
        options: [
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' },
          { label: '橙子', value: 'orange' },
          { label: '葡萄', value: 'grape' },
          { label: '西瓜', value: 'watermelon' },
        ],
        defaultValue: ['apple', 'banana', 'orange', 'grape'],
        multiple: true,
        maxTagCount: 2,
        placeholder: '请选择水果',
        onChange: (value: string[]) => console.log('选中:', value)
      } as SelectProps
    },
  ]
};

export default demo;