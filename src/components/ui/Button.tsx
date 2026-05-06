'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'surface';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
};

type ActionButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'surface';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

type ButtonProps = LinkButtonProps | ActionButtonProps;

/**
 * Neobrutalism style Button component.
 * Supports link or button behaviors.
 */
export const Button = (props: ButtonProps) => {
  const { children, className = '', variant = 'primary', size = 'md', disabled = false } = props;
  const href = 'href' in props ? props.href : undefined;
  const onClick = 'onClick' in props ? props.onClick : undefined;
  const type = 'type' in props ? props.type : 'button';
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
    if (disabled) {
      return (
        <span
          className={`${combinedClassName} opacity-50 cursor-not-allowed pointer-events-none`}
          aria-disabled="true"
          role="link"
          tabIndex={-1}
        >
          {children}
        </span>
      );
    }
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
