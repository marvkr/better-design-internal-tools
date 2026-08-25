import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Talentboard Badge: compact status chips. Tinted fills with hairline rims;
// gold variant carries the signature warm accent.

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/15 text-primary " +
          "shadow-[inset_0_0_0_1px_oklch(0.7_0.17_52/0.3)]",
        secondary:
          "border-border bg-secondary text-secondary-foreground",
        outline: "border-border text-foreground",
        destructive:
          "border-transparent bg-destructive/15 text-destructive " +
          "shadow-[inset_0_0_0_1px_oklch(0.6_0.2_27/0.35)]",
        success:
          "border-transparent bg-[oklch(0.66_0.15_152/0.14)] text-[color:var(--tb-success)] " +
          "shadow-[inset_0_0_0_1px_oklch(0.66_0.15_152/0.3)]",
        gold:
          "border-transparent bg-[image:none] bg-[color:var(--tb-gold-soft)] text-[color:var(--tb-gold)] " +
          "shadow-[inset_0_0_0_1px_oklch(0.8_0.13_78/0.35)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
