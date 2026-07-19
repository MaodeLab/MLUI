// components/Input/index.tsx
'use client';

import React, { forwardRef } from 'react';
import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    success = false,
    size = 'md',
    fullWidth = false,
    leftIcon,
    rightIcon,
    helperText,
    className = '',
    disabled = false,
    ...props
}, ref) => {
    const sizes = {
        sm: 'h-7 text-sm px-2.5',
        md: 'h-8 text-[15px] px-3',
        lg: 'h-9 text-base px-3.5',
    };

    const sizeClasses = sizes[size] || sizes.md;

    const baseInput = `
  w-full
  rounded-md
  border-[1.5px]
  bg-[var(--color-bg-card)]
  text-[var(--color-text)]
  placeholder:text-[var(--color-text-muted)]
  transition-colors
  duration-200
  outline-none
  focus:ring-2
  focus:ring-[var(--color-ring)]/20
  disabled:opacity-50
  disabled:cursor-not-allowed
  ${sizeClasses}
`;

    const borderColor = error
        ? 'border-[var(--color-danger)]'
        : success
            ? 'border-[var(--color-success)]'
            : 'border-[var(--color-border)] hover:border-[var(--color-border)]';

    const inputWithIcon = `
    ${leftIcon ? 'pl-8' : ''}
    ${rightIcon ? 'pr-8' : ''}
  `;

    const labelBase = `
    text-[var(--color-text)]
    font-medium
    mb-1.5
    block
    text-sm
  `;

    const errorText = `
    text-[var(--color-danger)]
    text-sm
    mt-1
  `;

    const helperTextBase = `
    text-[var(--color-text-muted)]
    text-sm
    mt-1
  `;

    const iconWrapper = `
    absolute
    top-1/2
    -translate-y-1/2
    flex
    items-center
    justify-center
    text-[var(--color-text-muted)]
    pointer-events-none
  `;

    return (
        <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
            {label && (
                <label className={labelBase}>
                    {label}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className={`${iconWrapper} left-2.5`}>
                        {leftIcon}
                    </div>
                )}

                <input
                    ref={ref}
                    disabled={disabled}
                    className={`
            ${baseInput}
            ${borderColor}
            ${inputWithIcon}
            ${error ? 'focus:ring-[var(--color-danger)]' : ''}
            ${success ? 'focus:ring-[var(--color-success)]' : ''}
          `}
                    {...props}
                />

                {rightIcon && (
                    <div className={`${iconWrapper} right-2.5`}>
                        {rightIcon}
                    </div>
                )}
            </div>

            {error && (
                <p className={errorText}>{error}</p>
            )}

            {helperText && !error && (
                <p className={helperTextBase}>{helperText}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;