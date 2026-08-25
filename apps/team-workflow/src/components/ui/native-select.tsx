import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "appearance-none pr-9 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-muted-foreground" />
    </div>
  )
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
