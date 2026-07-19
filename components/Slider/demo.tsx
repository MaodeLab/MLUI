// components/Slider/demo.tsx
import { Slider } from './index';
import type { SliderProps } from './types';

const demo = {
    component: Slider,
    title: '滑块',
    description: '用于数值范围的选取',
    category: '数据录入',
    examples: [
        {
            label: '默认',
            props: {
                defaultValue: 50,
                onChange: (value: number) => console.log('值:', value),
                onChangeEnd: (value: number) => console.log('最终值:', value),
            } as SliderProps
        },
        {
            label: '带标签',
            props: {
                label: '音量',
                defaultValue: 70,
                onChange: (value: number) => console.log('音量:', value),
            } as SliderProps
        },
        {
            label: '范围限制 (20-80)',
            props: {
                defaultValue: 50,
                min: 20,
                max: 80,
                onChange: (value: number) => console.log('值:', value),
            } as SliderProps
        },
        {
            label: '步长 (步进2)',
            props: {
                defaultValue: 0,
                step: 2,
                onChange: (value: number) => console.log('值:', value),
            } as SliderProps
        },
        {
            label: '小尺寸',
            props: {
                defaultValue: 50,
                size: 'sm',
                onChange: (value: number) => console.log('值:', value),
            } as SliderProps
        },
        {
            label: '大尺寸',
            props: {
                defaultValue: 50,
                size: 'lg',
                onChange: (value: number) => console.log('值:', value),
            } as SliderProps
        },
        {
            label: '隐藏数值',
            props: {
                defaultValue: 50,
                showValue: false,
                onChange: (value: number) => console.log('值:', value),
            } as SliderProps
        },
        {
            label: '自定义格式化',
            props: {
                label: '进度',
                defaultValue: 75,
                formatValue: (value: number) => `${value}%`,
                onChange: (value: number) => console.log('进度:', value),
            } as SliderProps
        },
        {
            label: '禁用状态',
            props: {
                defaultValue: 50,
                disabled: true,
            } as SliderProps
        },
        {
            label: '带悬浮框',
            props: {
                label: '音量',
                defaultValue: 50,
                showTooltip: true,
                onChange: (value: number) => console.log('音量:', value),
            } as SliderProps
        },
    ]
};

export default demo;