// components/Textarea/index.tsx
'use client';

import React, { forwardRef } from 'react';
import { TextareaProps } from './types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  success = false,
  size = 'md',
  fullWidth = false,
  helperText,
  className = '',
  disabled = false,
  rows = 4,
  resize = 'vertical',
  ...props
}, ref) => {
  const sizes = {
    sm: 'text-sm px-2.5 py-1.5',
    md: 'text-[15px] px-3 py-2',
    lg: 'text-base px-3.5 py-2.5',
  };

  const sizeClasses = sizes[size] || sizes.md;

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  const baseTextarea = `
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
    ${resizeClasses[resize]}
  `;

  const borderColor = error 
    ? 'border-[var(--color-danger)]' 
    : success 
      ? 'border-[var(--color-success)]' 
      : 'border-[var(--color-border)]';

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

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className={labelBase}>
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        disabled={disabled}
        rows={rows}
        className={`
          ${baseTextarea}
          ${borderColor}
          ${error ? 'focus:ring-[var(--color-danger)]/20' : ''}
          ${success ? 'focus:ring-[var(--color-success)]/20' : ''}
        `}
        {...props}
      />

      {error && (
        <p className={errorText}>{error}</p>
      )}

      {helperText && !error && (
        <p className={helperTextBase}>{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;