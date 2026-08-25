# Design system rules

The files in `components/ui/*` ARE the design system installed by Better Design.

**Compose them. Never hand-roll a primitive the DS already ships.** Rebuilding
`Button` as a raw `<button>`, a table as a raw `<table>`, or faking a ⌘K palette,
account menu, or notification bell with bare `<div>`s is a bug even when it looks
right: it only matches because both read the same `app/globals.css` tokens, and the
faked interactive pieces end up dead (the search opens nothing, the menu has no
items, the bell does nothing).

Map each UI need to the installed component BEFORE writing markup:

- buttons, nav links (use `asChild`) -> `button`
- panels, cards, KPI tiles, section containers -> `card`
- tabular data -> `table` (not a raw `<table>`)
- status pills, tags, labels -> `badge`
- ⌘K / search palette -> `command` (`CommandDialog`)
- account / overflow / context menus -> `dropdown-menu`
- notification bell, flyouts -> `popover` + `notification`
- transient confirmations -> `use-toast` + `toaster`
- tooltips -> `tooltip` (wrap the app in `TooltipProvider`)
- modals -> `dialog`; tab switchers -> `tabs`; avatars -> `avatar`; dividers -> `separator`
- form fields -> `input` / `textarea` / `select` / `checkbox` / `switch` / `radio-group`

Read a component's source from `components/ui/` to learn its props/exports. Use only
the design tokens in `app/globals.css`; never invent colors, spacing, or radii.

**Copy and layout restraint.** The words inside the UI are part of the design system
too. Write the fewest words that carry the meaning: headlines about 6 words, one short
supporting line per section, no filler adjectives (seamless, effortless, powerful), no
exclamation marks, never emoji as icons or status indicators (use the DS's icon library
or `badge` variants). Every visible text fragment needs one job: context, outcome,
next action, real doubt, or legal/security. Do not add template footer, provenance,
helper, or slogan copy. If deletion does not hurt meaning, action clarity, safety,
compliance, or tone, keep it deleted. Never place an eyebrow, kicker,
category, or status label immediately above an `h1`, `h2`, or `h3`; start with the
title and put essential context in the supporting line or after the title. Skip the generated-template shapes unless explicitly requested:
gradient hero with an uppercase eyebrow pill, centered three-card feature grid,
left-border callout boxes, walls of text. A colored bar down the left edge is the same
tell on an active nav item as in a callout, however it is painted: `border-l`, an inset
shadow offset only horizontally, or a pseudo-element pinned to the left edge. Carry a
selected state with the design system's own fill, weight, or text color instead. Never
join facts with a middot: `Ari from Mono · Waiting 18 min` gives two facts one weight,
so lead with the fact a person acts on and let the rest recede by size or color. A
nested corner subtracts its padding, so an inner radius is the outer radius minus the
gap, never the next token down the scale.

**Count the copy before you present.** This is a check to run, not advice to weigh.
On the first view: at most 60 visible words, at most 25 separate text fragments, one
headline of about 6 words, and at most one supporting line of about 15 words per
section. Count them. If you are over, delete copy; do not shrink the type to fit and
do not move the words into a tooltip. A section that needs three sentences to explain
itself is a section whose layout is wrong.

**A landing page needs positioning, not adjectives.** On any page whose job is to
sell or explain a product, settle four answers before writing the headline: who it is
for, what they use today, the one difference that would make them switch, and why now.
Ask the user for those answers. Never invent a customer, a testimonial, a user count,
or an award. Then test the headline by pasting a competitor's name into it: if it still
reads true, it says nothing, and the fix is the positioning, not the wording. Load
`get-ux-principle({ topic: "positioning" })` for the full principle.

**Labels are sentence case, never letter-spaced capitals.** Do not style section
labels, stat captions, table column headers, card headers, or badges as tiny spaced
capitals (`text-xs uppercase tracking-widest`, with or without `font-mono`). It is
the single fastest generated-UI tell, and it costs legibility at exactly the size
where legibility is scarcest. Use sentence case at the DS's own label size and muted
color. Keep `font-mono` for code, IDs, keyboard shortcuts, and figures that must
align in a column.

**Hierarchy is pass/fail.** Give the first view one P0 task and at most one P1
summary; move P2 history, standings, detailed metadata, and empty-state chrome
below it or behind a tab/disclosure. Unless the user explicitly asks for a dense
dashboard, simplify any first view with more than three major regions, five
immediately visible actions, or 25 visible text fragments. Do not shrink everything
to make it fit: the primary display must be at least 1.5× base UI text, section
anchors at least 1.2×, and labels are a last resort. Reserve bold for the primary
display, section anchors, and active values.

**Composition and proximity are pass/fail.** Keep one visible identity block per
level; do not repeat the product logo/title directly above a second identity block.
Short tasks size to content and fail when more than one-third of a major surface is
unused after the primary action. Keep an input, its derived value, and submit action
together; align the input and button to the same height and bottom baseline. A numeric
stake field should fit its value rather than stretch across the canvas. Decorative
domain geometry stays inside the event header and never crosses controls. Paired flags,
crests, or logos must be accurate and symmetric; otherwise omit all peer assets.

## Presentation builds use Open Slide

For any pitch deck, presentation, or slide system in a coding host with filesystem and terminal access, use Open Slide (`@open-slide/core`) with React slide components as the primary editable source. Do not substitute PowerPoint, Google Slides, Reveal, or a standalone static artifact unless the user explicitly requests a different primary format. Unless the user explicitly requests that format as primary, PPTX and PDF are secondary exports only. If Open Slide is unavailable, add and configure it before authoring the deck.

After writing UI, self-review with
`get-review-rules` and fix every critical/serious issue before presenting.


## Icons — use Phosphor

This project's design system is paired with **Phosphor** icons (Iconify prefix `ph`, variant `duotone`). Use this library for EVERY icon in the app. Do NOT use `lucide-react` or mix icon sets — that breaks visual consistency with the installed components.

Add icons as SSR-clean inline React components (no runtime CDN fetch, no first-paint flash): fetch each from `https://api.iconify.design/ph/<name>.svg` and inline it as a component, or use the Better Design `install-icons` MCP tool when available. Avoid the runtime `<Icon icon="ph:name" />` pattern.
