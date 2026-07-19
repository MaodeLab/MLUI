// components/Stepper/index.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { StepperProps } from './types';

export const Stepper: React.FC<StepperProps> = ({
    value: controlledValue,
    defaultValue = 0,
    min = -Infinity,
    max = Infinity,
    step = 1,
    onChange,
    disabled = false,
    className = '',
    size = 'md',
    ...props
}) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);

    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = useCallback((newValue: number) => {
        const clampedValue = Math.min(Math.max(newValue, min), max);
        if (!isControlled) {
            setInternalValue(clampedValue);
        }
        onChange?.(clampedValue);
    }, [isControlled, min, max, onChange]);

    const handleDecrement = useCallback(() => {
        handleChange(currentValue - step);
    }, [currentValue, step, handleChange]);

    const handleIncrement = useCallback(() => {
        handleChange(currentValue + step);
    }, [currentValue, step, handleChange]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
            handleChange(val);
        }
    }, [handleChange]);

    const sizes = {
        sm: 'h-7 [&>button]:w-7 [&>input]:w-10 [&>input]:text-sm',
        md: 'h-8 [&>button]:w-8 [&>input]:w-12 [&>input]:text-[15px]',
        lg: 'h-9 [&>button]:w-9 [&>input]:w-14 [&>input]:text-base',
    };

    const buttonBase = `
    flex items-center justify-center
    bg-[var(--color-primary)]
    text-[var(--color-bg)]
    hover:bg-[var(--color-primary-hover)]
    active:bg-[var(--color-primary-active)]
    disabled:opacity-50
    disabled:pointer-events-none
    disabled:cursor-not-allowed
    transition-colors
    duration-200
    select-none
  `;

const inputBase = `
  text-center
  bg-transparent
  text-[var(--color-text)]
  outline-none
  disabled:opacity-50
  disabled:pointer-events-none
  disabled:cursor-not-allowed
  [-moz-appearance:textfield]
  [&::-webkit-outer-spin-button]:appearance-none
  [&::-webkit-inner-spin-button]:appearance-none
`;

    const sizeClasses = sizes[size] || sizes.md;

    return (
        <div
            className={`inline-flex items-center rounded-lg border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg-card)] p-0.5 select-none ${sizeClasses} ${className}`}
            {...props}
        >
            <button
                type="button"
                onClick={handleDecrement}
                disabled={disabled || currentValue <= min}
                className={`${buttonBase} rounded-md h-full`}
            >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
            </button>

            <input
                type="number"
                value={currentValue}
                onChange={handleInputChange}
                disabled={disabled}
                className={`${inputBase} ${sizeClasses}`}
                min={min}
                max={max}
                step={step}
            />

            <button
                type="button"
                onClick={handleIncrement}
                disabled={disabled || currentValue >= max}
                className={`${buttonBase} rounded-md h-full`}
            >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
};

export default Stepper;