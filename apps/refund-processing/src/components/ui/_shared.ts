export const hlPrimaryRaised =
  "bg-[image:var(--hl-primary-gradient)] text-primary-foreground shadow-[var(--hl-shadow-primary)]";

export const hlPrimaryRaisedHover =
  "hover:shadow-[var(--hl-shadow-primary-hover)] hover:brightness-[1.04]";

// Scaled-down primary material for small filled controls.
export const hlControlFill =
  "bg-[image:var(--hl-primary-gradient)] shadow-[var(--hl-shadow-primary-sm)]";

// Raised neutral panel: secondary buttons, toolbar chips, kbd.
export const hlRaisedPanel =
  "bg-secondary text-secondary-foreground border border-border/70 shadow-[var(--hl-shadow-raise)]";

// Card surface: layered soft shadow, hairline rim, sharp-ish radius.
export const hlCardSurface =
  "bg-card text-card-foreground border border-border/60 shadow-[var(--hl-shadow-card)]";

// Floating surface: dropdowns, selects, popovers, tooltips, command,
// context menus, menubar, navigation menu, hover cards. One shadow token.
export const hlPopSurface =
  "bg-popover text-popover-foreground border border-border/60 shadow-[var(--hl-shadow-pop)]";

// Every form field (Input, Textarea, PasswordInput, SearchInput, NumberInput,
// PhoneInput, InputOTP) imports this single base: recessed fill, soft inset
// shadow, cyan focus ring.
export const formFieldBase =
  "w-full bg-input/80 text-foreground placeholder:text-muted-foreground " +
  "border border-border/70 shadow-[var(--hl-shadow-inset)] " +
  "transition-[border-color,box-shadow,background-color] duration-150 ease-out " +
  "hover:border-border " +
  "focus-visible:outline-none focus-visible:border-ring/60 focus-visible:ring-2 focus-visible:ring-ring/35 " +
  "disabled:cursor-not-allowed disabled:opacity-50";
