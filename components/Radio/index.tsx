// components/Radio/index.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { RadioProps } from './types';

export const Radio: React.FC<RadioProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  className = '',
  direction = 'vertical',
  size = 'md',
  ...props
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback((val: string) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
  }, [isControlled, disabled, onChange]);

  const sizes = {
    sm: {
      radio: 'w-4 h-4',
      dot: 'w-2 h-2',
      label: 'text-sm',
      gap: 'gap-2'
    },
    md: {
      radio: 'w-5 h-5',
      dot: 'w-2.5 h-2.5',
      label: 'text-[15px]',
      gap: 'gap-2.5'
    },
    lg: {
      radio: 'w-6 h-6',
      dot: 'w-3 h-3',
      label: 'text-base',
      gap: 'gap-3'
    }
  };

  const sizeClasses = sizes[size] || sizes.md;

  const directionClass = direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col';

  const radioBase = `
    rounded-full
    border-2
    border-[var(--color-border)]
    bg-[var(--color-bg-card)]
    flex-shrink-0
    flex items-center justify-center
    transition-colors
    duration-200
    cursor-pointer
  `;

  const radioChecked = `
    border-[var(--color-primary)]
    bg-[var(--color-primary)]
  `;

  const radioDisabled = `
    opacity-50
    cursor-not-allowed
  `;

  const dotBase = `
    rounded-full
    bg-[var(--color-bg)]
    transition-transform
    duration-200
    scale-0
  `;

  const dotChecked = `
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
      role="radiogroup"
      {...props}
    >
      {options.map((option) => {
        const isChecked = currentValue === option.value;
        const isDisabled = disabled || option.disabled;

        return (
          <label
            key={option.value}
            className={`flex items-center ${sizeClasses.gap} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => handleChange(option.value)}
          >
            <div
              className={`
                ${radioBase}
                ${sizeClasses.radio}
                ${isChecked ? radioChecked : ''}
                ${isDisabled ? radioDisabled : ''}
              `}
            >
              <div
                className={`
                  ${dotBase}
                  ${sizeClasses.dot}
                  ${isChecked ? dotChecked : ''}
                `}
              />
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

export default Radio;