'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'surface';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

/**
 * Neobrutalism style Button component.
 * Supports both link (href) and button (onClick) behaviors.
 */
export const Button = ({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const baseStyles = "font-mono inline-flex items-center justify-center font-black transition-all duration-fast border-2 border-border-default shadow-mini hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-hover active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-4 focus-visible:outline-secondary outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-primary text-text",
    secondary: "bg-secondary text-surface",
    surface: "bg-surface text-text",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-xs min-h-[44px]",
    md: "px-4 py-2 text-sm min-h-[44px]",
    lg: "px-6 py-3 text-md min-h-[48px]",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName} disabled={disabled}>
      {children}
    </button>
  );
};
