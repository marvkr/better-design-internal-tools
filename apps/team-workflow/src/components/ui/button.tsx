import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Atelier Button — quiet-luxury pills on light ground.
 *   - default IS the signature: a deep forest-green pill, a faint top light
 *     caught on its upper rim, one soft green-tinted drop shadow. Hover
 *     deepens the green like ink soaking in; press settles it flat.
 *   - secondary: the warm gray chip from the reference toolbar (USD, 6 Months).
 *   - outline / ghost stay hairline and understated; nothing shouts.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "rounded-full cursor-pointer select-none",
    "transition-[background-color,border-color,box-shadow,transform] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px active:[box-shadow:var(--shadow-s)]",
  ].join(" "),
  {
    variants: {
      variant: {
        // The hero treatment lives on `default` (showcase + templates render
        // the primary CTA with no variant prop).
        default:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:bg-primary-hover hover:[box-shadow:var(--shadow-button-hover)]",
        primary:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:bg-primary-hover hover:[box-shadow:var(--shadow-button-hover)]",
        secondary:
          "bg-secondary text-secondary-foreground border border-border " +
          "[box-shadow:var(--shadow-s)] " +
          "hover:bg-muted hover:border-ring/25",
        outline:
          "bg-card text-foreground border border-border " +
          "[box-shadow:var(--shadow-s)] " +
          "hover:bg-secondary hover:border-ring/25",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:inset_0_1px_0_oklch(1_0_0/0.16),0_1px_2px_oklch(0.3_0.12_28/0.12),0_3px_10px_-2px_oklch(0.3_0.12_28/0.1)] " +
          "hover:brightness-95",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-3.5 text-sm",
        default: "h-11 px-5",
        lg: "h-11 px-6",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
