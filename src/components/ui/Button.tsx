import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sky-500 text-white hover:bg-sky-400 focus-visible:outline-sky-500 disabled:bg-sky-400",
  ghost:
    "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white disabled:bg-white/5",
};

export const Button = ({
  className,
  variant = "primary",
  loading,
  children,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(
      "inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
      variantStyles[variant],
      className
    )}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? "Please wait..." : children}
  </button>
);
