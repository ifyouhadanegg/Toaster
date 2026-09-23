import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
  }
>;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-toast text-white shadow-panel hover:bg-[#e95f00]',
  secondary: 'bg-white text-toastDark ring-1 ring-orange-300 hover:bg-orange-50',
  ghost: 'bg-transparent text-toastDark hover:bg-orange-50'
};

export function buttonClassName(variant: ButtonVariant = 'primary', className = ''): string {
  return `inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-toast focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`;
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={buttonClassName(variant, className)} {...props}>
      {children}
    </button>
  );
}