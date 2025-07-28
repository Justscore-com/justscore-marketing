"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "default" | "sm" | "lg";
  className?: string;
  disabled?: boolean;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      onCheckedChange,
      size = "default",
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    // Size variants for the switch root
    const sizeVariants = {
      sm: "h-4 w-6",
      default: "h-[1.15rem] w-8", 
      lg: "h-6 w-10"
    };

    // Size variants for the thumb
    const thumbSizeVariants = {
      sm: "size-3",
      default: "size-4",
      lg: "size-5"
    };

    return (
      <SwitchPrimitive.Root
        ref={ref}
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        data-slot="switch"
        className={cn(
          "peer data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-neutral-300 focus-visible:border-primary-500 focus-visible:ring-primary-500/50 inline-flex shrink-0 items-center rounded-full border border-transparent shadow-sm transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          sizeVariants[size],
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={cn(
            "bg-white pointer-events-none block rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
            thumbSizeVariants[size]
          )}
        />
      </SwitchPrimitive.Root>
    );
  }
);

Switch.displayName = "Switch";