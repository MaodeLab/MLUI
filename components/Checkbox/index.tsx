// components/Checkbox/index.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { CheckboxProps } from './types';

export const Checkbox: React.FC<CheckboxProps> = ({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  disabled = false,
  className = '',
  direction = 'vertical',
  size = 'md',
  ...props
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);

  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback((val: string, checked: boolean) => {
    if (disabled) return;
    
    let newValue: string[];
    if (checked) {
      newValue = [...currentValue, val];
    } else {
      newValue = currentValue.filter(v => v !== val);
    }
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, disabled, currentValue, onChange]);

  const sizes = {
    sm: {
      checkbox: 'w-4 h-4',
      icon: 'w-3 h-3',
      label: 'text-sm',
      gap: 'gap-2'
    },
    md: {
      checkbox: 'w-5 h-5',
      icon: 'w-3.5 h-3.5',
      label: 'text-[15px]',
      gap: 'gap-2.5'
    },
    lg: {
      checkbox: 'w-6 h-6',
      icon: 'w-4 h-4',
      label: 'text-base',
      gap: 'gap-3'
    }
  };

  const sizeClasses = sizes[size] || sizes.md;

  const directionClass = direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col';

  const checkboxBase = `
    rounded
    border-2
    border-[var(--color-border)]
    bg-[var(--color-bg-card)]
    flex-shrink-0
    flex items-center justify-center
    transition-colors
    duration-200
    cursor-pointer
  `;

  const checkboxChecked = `
    border-[var(--color-primary)]
    bg-[var(--color-primary)]
  `;

  const checkboxDisabled = `
    opacity-50
    cursor-not-allowed
  `;

  const iconBase = `
    text-[var(--color-bg)]
    transition-transform
    duration-200
    scale-0
  `;

  const iconChecked = `
    scale-100
  `;

  const labelBase = `
    text-[var(--color-text)]
    cursor-pointer
    select-none
    ${sizeClasses.label}
  `;

  const labelDisabled = `
    opacity-50
    cursor-not-allowed
  `;

return (
  <div
    className={`flex ${directionClass} ${sizeClasses.gap} ${className}`}
    role="group"
    {...props}
  >
    {options.map((option) => {
      const isChecked = currentValue.includes(option.value);
      const isDisabled = disabled || option.disabled;

      return (
        <label
          key={option.value}
          className={`flex items-center ${sizeClasses.gap} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => handleChange(option.value, !isChecked)}
        >
          <div
            className={`
              ${checkboxBase}
              ${sizeClasses.checkbox}
              ${isChecked ? checkboxChecked : ''}
              ${isDisabled ? checkboxDisabled : ''}
            `}
          >
            <svg
              className={`
                ${iconBase}
                ${sizeClasses.icon}
                ${isChecked ? iconChecked : ''}
              `}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className={`
            ${labelBase}
            ${isDisabled ? labelDisabled : ''}
          `}>
            {option.label}
          </span>
        </label>
      );
    })}
  </div>
);
};

export default Checkbox;