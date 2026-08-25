"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/*
 * Atelier Progress — a recessed near-white track filled by the primary green,
 * wearing the same soft button material as every other filled control.
 */

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full border border-border",
      "bg-input [box-shadow:var(--shadow-inset)]",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-primary transition-[width] duration-300 [box-shadow:var(--shadow-primary)]"
      style={{ width: `${value || 0}%` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
