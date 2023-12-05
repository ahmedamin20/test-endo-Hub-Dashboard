import { cn } from "@/utilities/cn";
import React from "react";

export default function MainButton({
  className,
  children,
  type,
  disabled,
  loading,
  buttonClassName,
  ...rest
}: React.HTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset" | undefined;
  buttonClassName?: string;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <div className={cn(" primary-bg-gradient items-center  justify-center w-full ", className)}>
      <button
        className={cn("border-0 w-full h-full", buttonClassName)}
        type={type}
        disabled={disabled || loading}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
}
