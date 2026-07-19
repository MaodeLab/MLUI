// components/Slider/index.tsx
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SliderProps } from './types';

export const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onChangeEnd,
  disabled = false,
  className = '',
  size = 'md',
  showValue = true,
  showTooltip = false,
  label,
  formatValue = (v) => String(v),
  ...props
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentValue = isControlled ? controlledValue : internalValue;
  const percent = ((currentValue - min) / (max - min)) * 100;

  const clampValue = useCallback((val: number) => {
    return Math.min(Math.max(val, min), max);
  }, [min, max]);

  const handleChange = useCallback((val: number) => {
    const clamped = clampValue(val);
    const stepped = Math.round(clamped / step) * step;
    const finalValue = clampValue(stepped);
    
    if (!isControlled) {
      setInternalValue(finalValue);
    }
    onChange?.(finalValue);
  }, [clampValue, step, isControlled, onChange]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    sliderRef.current?.setPointerCapture(e.pointerId);
  }, [disabled]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = Math.min(Math.max(x / width, 0), 1);
    const value = min + (max - min) * percent;
    handleChange(value);
  }, [isDragging, min, max, handleChange]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    sliderRef.current?.releasePointerCapture(e.pointerId);
    onChangeEnd?.(currentValue);
  }, [isDragging, currentValue, onChangeEnd]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    const stepSize = e.shiftKey ? step * 10 : step;
    let newValue = currentValue;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      newValue = currentValue + stepSize;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      newValue = currentValue - stepSize;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newValue = min;
    } else if (e.key === 'End') {
      e.preventDefault();
      newValue = max;
    }
    
    handleChange(newValue);
  }, [disabled, step, currentValue, min, max, handleChange]);

  const sizes = {
    sm: {
      track: 'h-1.5',
      thumb: 'w-3 h-3',
      value: 'text-sm',
      label: 'text-sm',
      tooltip: 'text-xs px-1.5 py-0.5 -translate-y-[calc(100%+8px)]',
      gap: 'gap-2'
    },
    md: {
      track: 'h-2',
      thumb: 'w-4 h-4',
      value: 'text-[15px]',
      label: 'text-[15px]',
      tooltip: 'text-sm px-2 py-0.5 -translate-y-[calc(100%+10px)]',
      gap: 'gap-2.5'
    },
    lg: {
      track: 'h-2.5',
      thumb: 'w-5 h-5',
      value: 'text-base',
      label: 'text-base',
      tooltip: 'text-sm px-2.5 py-1 -translate-y-[calc(100%+12px)]',
      gap: 'gap-3'
    }
  };

  const sizeClasses = sizes[size] || sizes.md;

  const labelBase = `
    text-[var(--color-text)]
    font-medium
    ${sizeClasses.label}
  `;

  const valueBase = `
    text-[var(--color-text-secondary)]
    font-medium
    ${sizeClasses.value}
    min-w-[2rem]
    text-right
  `;

  const tooltipBase = `
    absolute
    left-1/2
    -translate-x-1/2
    ${sizeClasses.tooltip}
    rounded
    bg-[var(--color-primary)]
    text-[var(--color-bg)]
    font-medium
    whitespace-nowrap
    pointer-events-none
    opacity-0
    transition-opacity
    duration-200
    z-10
  `;

  const tooltipVisible = `
    opacity-100
  `;

  const showTooltipActive = showTooltip && (isDragging || isHovering);

  return (
    <div className={`${className}`} {...props}>
      {(label || showValue) && (
        <div className={`flex items-center justify-between ${sizeClasses.gap} mb-1.5`}>
          {label && (
            <span className={labelBase}>{label}</span>
          )}
          {showValue && (
            <span className={valueBase}>{formatValue(currentValue)}</span>
          )}
        </div>
      )}

      <div
        ref={sliderRef}
        className={`
          relative
          w-full
          rounded-full
          bg-[var(--color-bg-secondary)]
          cursor-pointer
          ${sizeClasses.track}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuenow={currentValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled}
      >
        {/* 进度条 */}
        <div
          className={`
            absolute
            left-0
            top-0
            h-full
            rounded-full
            bg-[var(--color-primary)]
            transition-[width]
            ${isDragging ? 'duration-0' : 'duration-150'}
          `}
          style={{ width: `${percent}%` }}
        />

        {/* 滑块圆点 */}
        <div
          className={`
            absolute
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[var(--color-primary)]
            border-2
            border-[var(--color-bg-card)]
            shadow-md
            transition-transform
            ${isDragging ? 'duration-0' : 'duration-150'}
            ${sizeClasses.thumb}
            ${disabled ? '' : 'hover:scale-110 active:scale-110'}
          `}
          style={{ left: `${percent}%` }}
        />

        {/* 悬浮框 - 只在激活时显示 */}
        {showTooltip && (
          <div
            ref={tooltipRef}
            className={`
              ${tooltipBase}
              ${showTooltipActive ? tooltipVisible : ''}
            `}
            style={{ left: `${percent}%` }}
          >
            {formatValue(currentValue)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;