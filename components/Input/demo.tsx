// components/Input/demo.tsx
import { Input } from './index';
import type { InputProps } from './types';

const demo = {
  component: Input,
  title: '输入框',
  description: '用于文本输入',
  category: '数据录入',
  examples: [
    {
      label: '默认',
      props: {
        placeholder: '请输入内容...',
      } as InputProps
    },
    {
      label: '带标签',
      props: {
        label: '用户名',
        placeholder: '请输入用户名',
      } as InputProps
    },
    {
      label: '带左侧图标',
      props: {
        label: '邮箱',
        placeholder: '请输入邮箱',
        leftIcon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
      } as InputProps
    },
    {
      label: '带右侧图标',
      props: {
        label: '密码',
        placeholder: '请输入密码',
        type: 'password',
        rightIcon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ),
      } as InputProps
    },
    {
      label: '错误状态',
      props: {
        label: '邮箱',
        placeholder: '请输入邮箱',
        error: '请输入正确的邮箱地址',
        defaultValue: 'invalid-email',
      } as InputProps
    },
    {
      label: '成功状态',
      props: {
        label: '邮箱',
        placeholder: '请输入邮箱',
        success: true,
        defaultValue: 'user@example.com',
      } as InputProps
    },
    {
      label: '小尺寸',
      props: {
        placeholder: '小尺寸输入框',
        size: 'sm',
      } as InputProps
    },
    {
      label: '大尺寸',
      props: {
        placeholder: '大尺寸输入框',
        size: 'lg',
      } as InputProps
    },
    {
      label: '禁用状态',
      props: {
        placeholder: '禁用输入框',
        disabled: true,
        defaultValue: '不可编辑',
      } as InputProps
    },
    {
      label: '带辅助文字',
      props: {
        label: '用户名',
        placeholder: '请输入用户名',
        helperText: '2-20个字符，支持字母和数字',
        defaultValue: 'user',
      } as InputProps
    },
    {
      label: '全宽',
      props: {
        placeholder: '全宽输入框',
        fullWidth: true,
      } as InputProps
    }
  ]
};

export default demo;