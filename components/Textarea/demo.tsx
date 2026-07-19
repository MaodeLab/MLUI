// components/Textarea/demo.tsx
import { Textarea } from './index';
import type { TextareaProps } from './types';

const demo = {
  component: Textarea,
  title: '文本域',
  description: '用于多行文本输入',
  category: '数据录入',
  examples: [
    {
      label: '默认',
      props: {
        placeholder: '请输入内容...',
        rows: 4,
      } as TextareaProps
    },
    {
      label: '带标签',
      props: {
        label: '备注',
        placeholder: '请输入备注信息',
        rows: 4,
      } as TextareaProps
    },
    {
      label: '错误状态',
      props: {
        label: '反馈',
        placeholder: '请输入反馈内容',
        error: '内容不能为空',
        rows: 4,
      } as TextareaProps
    },
    {
      label: '成功状态',
      props: {
        label: '反馈',
        placeholder: '请输入反馈内容',
        success: true,
        rows: 4,
        defaultValue: '内容已提交',
      } as TextareaProps
    },
    {
      label: '小尺寸',
      props: {
        placeholder: '小尺寸文本域',
        size: 'sm',
        rows: 3,
      } as TextareaProps
    },
    {
      label: '大尺寸',
      props: {
        placeholder: '大尺寸文本域',
        size: 'lg',
        rows: 4,
      } as TextareaProps
    },
    {
      label: '禁用状态',
      props: {
        placeholder: '禁用文本域',
        disabled: true,
        rows: 4,
        defaultValue: '不可编辑的内容',
      } as TextareaProps
    },
    {
      label: '带辅助文字',
      props: {
        label: '个人简介',
        placeholder: '请介绍一下自己',
        helperText: '最多 500 个字符',
        rows: 4,
      } as TextareaProps
    },
    {
      label: '禁止调整大小',
      props: {
        placeholder: '不能调整大小',
        resize: 'none',
        rows: 4,
      } as TextareaProps
    },
    {
      label: '全宽',
      props: {
        placeholder: '全宽文本域',
        fullWidth: true,
        rows: 4,
      } as TextareaProps
    }
  ]
};

export default demo;