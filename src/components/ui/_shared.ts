export const formFieldBase =
  "w-full rounded-md px-3 text-base sm:text-sm " +
  "bg-card text-foreground " +
  "border border-border " +
  "placeholder:text-muted-foreground " +
  "transition-[color,box-shadow,border-color] duration-150 " +
  "[box-shadow:var(--shadow-inset)] " +
  "hover:border-ring/30 " +
  "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export const formFieldSingleLine = "flex h-11 py-2 sm:h-9 sm:py-1.5";
export const formFieldMultiLine = "flex min-h-[80px] py-2 resize-y";
