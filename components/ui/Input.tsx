import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, containerClassName, className, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className={cn("relative flex items-center", containerClassName)}>
          {leftIcon && (
            <span className="absolute left-3 text-slate-400 pointer-events-none">{leftIcon}</span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "transition-shadow duration-150 text-sm py-2.5",
              leftIcon ? "pl-10" : "pl-3",
              rightIcon ? "pr-10" : "pr-3",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-slate-400">{rightIcon}</span>
          )}
        </div>
      );
    }
    return (
      <input
        ref={ref}
        className={cn(
          "w-full border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "transition-shadow duration-150 text-sm px-3 py-2.5",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
