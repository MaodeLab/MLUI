// components/Switch/index.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { SwitchProps } from './types';

export const Switch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = '',
  size = 'md',
  label,
  labelPosition = 'right',
  ...props
}) => {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const currentChecked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = useCallback(() => {
    if (disabled) return;
    const newChecked = !currentChecked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  }, [isControlled, disabled, currentChecked, onChange]);

  const sizes = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'w-3.5 h-3.5',
      thumbOffset: 'translate-x-[15px]',
      label: 'text-sm',
      gap: 'gap-2'
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-4.5 h-4.5',
      thumbOffset: 'translate-x-[18px]',
      label: 'text-[15px]',
      gap: 'gap-2.5'
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-5.5 h-5.5',
      thumbOffset: 'translate-x-[26px]',
      label: 'text-base',
      gap: 'gap-3'
    }
  };

  const sizeClasses = sizes[size] || sizes.md;

  const trackBase = `
    rounded-full
    border-2
    transition-colors
    duration-200
    flex-shrink-0
    cursor-pointer
    relative
  `;

  const trackOff = `
  border-[var(--color-bg-secondary)]
  bg-[var(--color-bg-secondary)]
`;

  const trackOn = `
    border-[var(--color-primary)]
    bg-[var(--color-primary)]
  `;

  const trackDisabled = `
    opacity-50
    cursor-not-allowed
  `;

  const thumbBase = `
    rounded-full
    bg-[var(--color-bg)]
    transition-transform
    duration-200
    absolute
    top-1/2
    -translate-y-1/2
    left-0.5
    shadow-sm
  `;

  const thumbOn = `
    ${sizeClasses.thumbOffset}
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

  const containerClass = label ? `inline-flex items-center ${sizeClasses.gap}` : 'inline-flex';

  return (
    <div
      className={`${containerClass} ${className}`}
      {...props}
    >
      {label && labelPosition === 'left' && (
        <span className={`${labelBase} ${disabled ? labelDisabled : ''}`}>
          {label}
        </span>
      )}

      <div
        className={`
          ${trackBase}
          ${sizeClasses.track}
          ${currentChecked ? trackOn : trackOff}
          ${disabled ? trackDisabled : ''}
        `}
        onClick={handleToggle}
      >
        <div
          className={`
            ${thumbBase}
            ${sizeClasses.thumb}
            ${currentChecked ? thumbOn : ''}
          `}
        />
      </div>

      {label && labelPosition === 'right' && (
        <span className={`${labelBase} ${disabled ? labelDisabled : ''}`}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Switch;