// components/Button/index.tsx
import React from 'react';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = `
  inline-flex 
  items-center 
  justify-center 
  rounded-md
  font-medium 
  transition-colors 
  duration-200 
  ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-[var(--color-ring)]
  focus-visible:ring-offset-2
  focus-visible:ring-offset-[var(--color-bg)]
  disabled:opacity-50 
  disabled:pointer-events-none
  disabled:cursor-not-allowed
  select-none
`;

  const variants = {
    primary: `
    bg-[var(--color-primary)]
    text-[var(--color-bg)]
    hover:bg-[var(--color-primary-hover)]
    active:bg-[var(--color-primary-active)]
  `,
    secondary: `
    bg-transparent
    text-[var(--color-text)]
    hover:bg-[var(--color-bg-hover)]
    active:bg-[var(--color-bg-hover)]/40
  `,
    outline: `
    bg-transparent
    text-[var(--color-primary)]
    border
    border-[var(--color-primary)]
    hover:bg-[var(--color-primary)]/8
    active:bg-[var(--color-primary)]/4
  `,
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm h-7',
    md: 'px-4 py-1.5 text-[15px] h-8',
    lg: 'px-6 py-2 text-base h-9',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};