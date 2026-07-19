// components/Select/index.tsx
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SelectProps, SelectOption } from './types';

export const Select: React.FC<SelectProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  placeholder = '请选择',
  onChange,
  disabled = false,
  className = '',
  size = 'md',
  fullWidth = false,
  searchable = false,
  popupMatchWidth = true,
  label,
  error,
  helperText,
  clearable = false,
  multiple = false,
  maxTagCount = 2,
  ...props
}) => {
  const isControlled = controlledValue !== undefined;
  
  // 初始化值
  const getInitialValue = () => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return multiple ? [] : '';
  };
  
  const [internalValue, setInternalValue] = useState<string | string[]>(getInitialValue);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const currentValue = isControlled ? controlledValue : internalValue;

  const getSelectedOptions = useCallback(() => {
    if (multiple && Array.isArray(currentValue)) {
      return options.filter(opt => currentValue.includes(opt.value));
    }
    const val = currentValue as string;
    return options.filter(opt => opt.value === val);
  }, [options, currentValue, multiple]);

  const selectedOptions = getSelectedOptions();

  const sizes = {
    sm: 'h-7 text-sm px-2.5',
    md: 'h-8 text-[15px] px-3',
    lg: 'h-9 text-base px-3.5',
  };

  const sizeClasses = sizes[size] || sizes.md;

  const filteredOptions = searchable && searchText
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchText.toLowerCase())
      )
    : options;

  const handleSelect = useCallback((option: SelectOption) => {
    if (option.disabled) return;

    if (multiple) {
      const current = Array.isArray(currentValue) ? currentValue : [];
      let newValue: string[];
      if (current.includes(option.value)) {
        newValue = current.filter(v => v !== option.value);
      } else {
        newValue = [...current, option.value];
      }
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    } else {
      if (!isControlled) {
        setInternalValue(option.value);
      }
      onChange?.(option.value);
      setIsOpen(false);
      setSearchText('');
    }
  }, [isControlled, currentValue, multiple, onChange]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = multiple ? [] : '';
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    setSearchText('');
  }, [isControlled, multiple, onChange]);

  const handleRemoveTag = useCallback((value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple && Array.isArray(currentValue)) {
      const newValue = currentValue.filter(v => v !== value);
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  }, [currentValue, multiple, isControlled, onChange]);

  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen && searchable) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [disabled, isOpen, searchable]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  const isSelected = useCallback((value: string) => {
    if (multiple && Array.isArray(currentValue)) {
      return currentValue.includes(value);
    }
    return currentValue === value;
  }, [currentValue, multiple]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchText('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ESC 关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchText('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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

  const borderColor = error 
    ? 'border-[var(--color-danger)]' 
    : 'border-[var(--color-border)]';

  const focusRing = error
    ? 'focus:ring-[var(--color-danger)]/20'
    : 'focus:ring-[var(--color-ring)]/20';

  const baseSelect = `
    w-full
    rounded-md
    border-[1.5px]
    bg-[var(--color-bg-card)]
    text-[var(--color-text)]
    transition-colors
    duration-200
    outline-none
    focus:ring-2
    ${focusRing}
    disabled:opacity-50
    disabled:cursor-not-allowed
    cursor-pointer
    ${sizeClasses}
    flex items-center justify-between
    gap-1
    flex-wrap
  `;

  const popupWidth = popupMatchWidth ? 'w-full' : 'min-w-[200px]';

  // 显示标签文本
  const getDisplayText = () => {
    if (selectedOptions.length === 0) return placeholder;
    if (!multiple) return selectedOptions[0]?.label || placeholder;
    
    if (selectedOptions.length <= maxTagCount) {
      return selectedOptions.map(opt => opt.label).join(', ');
    }
    return `${selectedOptions.slice(0, maxTagCount).map(opt => opt.label).join(', ')} +${selectedOptions.length - maxTagCount}`;
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {label && (
        <label className={labelBase}>{label}</label>
      )}

      <div ref={containerRef} className="relative">
        {/* 触发器 */}
        <div
          className={`
            ${baseSelect}
            ${borderColor}
            ${isOpen ? `ring-2 ${focusRing}` : ''}
            ${multiple ? 'min-h-[32px] py-0.5' : ''}
          `}
          onClick={toggleOpen}
        >
          <div className="flex-1 flex items-center gap-1 flex-wrap min-w-0">
            {multiple && selectedOptions.length > 0 ? (
              <>
                {selectedOptions.slice(0, maxTagCount).map((opt) => (
                  <span
                    key={opt.value}
                    className={`
                      inline-flex items-center gap-0.5
                      bg-[var(--color-primary)]/10
                      text-[var(--color-primary)]
                      rounded
                      px-1.5
                      py-0.5
                      text-xs
                      ${size === 'sm' ? 'text-[10px]' : ''}
                    `}
                  >
                    {opt.label}
                    <button
                      type="button"
                      onClick={(e) => handleRemoveTag(opt.value, e)}
                      className="hover:opacity-70"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                {selectedOptions.length > maxTagCount && (
                  <span className="text-[var(--color-text-muted)] text-sm">
                    +{selectedOptions.length - maxTagCount}
                  </span>
                )}
              </>
            ) : (
              <span className={`truncate ${selectedOptions.length === 0 ? 'text-[var(--color-text-muted)]' : ''}`}>
                {getDisplayText()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {clearable && ((multiple && Array.isArray(currentValue) && currentValue.length > 0) || (!multiple && currentValue)) && (
              <button
                type="button"
                onClick={handleClear}
                className="p-0.5 hover:bg-[var(--color-bg-hover)] rounded-full transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* 下拉弹出框 */}
        {isOpen && (
          <div
            ref={popupRef}
            className={`
              absolute
              z-20
              mt-1
              max-h-60
              overflow-auto
              rounded-md
              border-[1.5px]
              border-[var(--color-border)]
              bg-[var(--color-bg-card)]
              shadow-lg
              ${popupWidth}
            `}
          >
            {/* 搜索框 */}
            {searchable && (
              <div className="sticky top-0 bg-[var(--color-bg-card)] p-2 border-b border-[var(--color-border)]">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="搜索..."
                  className={`
                    w-full
                    rounded
                    border-[1.5px]
                    border-[var(--color-border)]
                    bg-transparent
                    text-[var(--color-text)]
                    placeholder:text-[var(--color-text-muted)]
                    outline-none
                    px-2.5
                    py-1.5
                    text-sm
                    focus:ring-2
                    focus:ring-[var(--color-ring)]/20
                  `}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* 全选（多选模式） */}
            {multiple && filteredOptions.length > 0 && (
              <div
                className={`
                  px-3 py-2
                  text-[var(--color-text-muted)]
                  text-sm
                  cursor-pointer
                  border-b
                  border-[var(--color-border)]
                  hover:bg-[var(--color-bg-hover)]
                  transition-colors
                  duration-150
                `}
                onClick={() => {
                  const allValues = filteredOptions
                    .filter(opt => !opt.disabled)
                    .map(opt => opt.value);
                  const current = Array.isArray(currentValue) ? currentValue : [];
                  const newValue = current.length === allValues.length ? [] : allValues;
                  if (!isControlled) {
                    setInternalValue(newValue);
                  }
                  onChange?.(newValue);
                }}
              >
                {(() => {
                  const allValues = filteredOptions.filter(opt => !opt.disabled).map(opt => opt.value);
                  const current = Array.isArray(currentValue) ? currentValue : [];
                  const isAllSelected = allValues.length > 0 && allValues.every(v => current.includes(v));
                  return isAllSelected ? '取消全选' : '全选';
                })()}
              </div>
            )}

            {/* 选项列表 */}
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-[var(--color-text-muted)] text-sm text-center">
                无匹配选项
              </div>
            ) : (
              filteredOptions.map((option) => {
                const selected = isSelected(option.value);
                return (
                  <div
                    key={option.value}
                    className={`
                      px-3
                      py-2
                      text-[var(--color-text)]
                      text-sm
                      cursor-pointer
                      transition-colors
                      duration-150
                      flex
                      items-center
                      gap-2
                      ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                      ${selected ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-hover)]'}
                    `}
                    onClick={() => handleSelect(option)}
                  >
                    {multiple && (
                      <div
                        className={`
                          w-4 h-4
                          rounded
                          border-2
                          flex-shrink-0
                          flex items-center justify-center
                          transition-colors
                          duration-200
                          ${selected ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'border-[var(--color-border)]'}
                        `}
                      >
                        {selected && (
                          <svg className="w-3 h-3 text-[var(--color-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    )}
                    <span className="flex-1">{option.label}</span>
                    {selected && !multiple && (
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                );
              })
            )}
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
};

export default Select;