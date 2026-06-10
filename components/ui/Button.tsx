import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", loading, className, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
      secondary: "bg-slate-100 hover:bg-slate-200 text-slate-800",
      ghost: "hover:bg-slate-100 text-slate-700",
      outline: "border border-slate-200 hover:bg-slate-50 text-slate-700 bg-white",
      danger: "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2",
    };
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && <span className="spinner" style={{ width: 14, height: 14 }} />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
