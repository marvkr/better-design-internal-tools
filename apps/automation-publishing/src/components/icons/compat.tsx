"use client";

import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function CompatIcon({ children, ...props }: IconProps & { children?: ReactNode }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children ?? <circle cx="12" cy="12" r="7" />}
    </svg>
  );
}

export function TrendingUp(props: IconProps) { return <CompatIcon {...props} />; }
export function ChevronLeft(props: IconProps) { return <CompatIcon {...props} />; }
export function ChevronRight(props: IconProps) { return <CompatIcon {...props} />; }
export function Check(props: IconProps) { return <CompatIcon {...props} />; }
export function MoreHorizontal(props: IconProps) { return <CompatIcon {...props} />; }
export function Minus(props: IconProps) { return <CompatIcon {...props} />; }
export function Plus(props: IconProps) { return <CompatIcon {...props} />; }
export function X(props: IconProps) { return <CompatIcon {...props} />; }
export function Pencil(props: IconProps) { return <CompatIcon {...props} />; }
export function Upload(props: IconProps) { return <CompatIcon {...props} />; }
export function FileText(props: IconProps) { return <CompatIcon {...props} />; }
export function Activity(props: IconProps) { return <CompatIcon {...props} />; }
export function Copy(props: IconProps) { return <CompatIcon {...props} />; }
export function Footprints(props: IconProps) { return <CompatIcon {...props} />; }
export function Waves(props: IconProps) { return <CompatIcon {...props} />; }
export function Calendar(props: IconProps) { return <CompatIcon {...props} />; }
export function Dot(props: IconProps) { return <CompatIcon {...props} />; }
export function CalendarIcon(props: IconProps) { return <CompatIcon {...props} />; }
export function Search(props: IconProps) { return <CompatIcon {...props} />; }
export function ArrowDownFromLine(props: IconProps) { return <CompatIcon {...props} />; }
export function ArrowUpFromLine(props: IconProps) { return <CompatIcon {...props} />; }
export function ChevronUp(props: IconProps) { return <CompatIcon {...props} />; }
export function ChevronDown(props: IconProps) { return <CompatIcon {...props} />; }
export function ChevronsUpDown(props: IconProps) { return <CompatIcon {...props} />; }
export function TrendingDown(props: IconProps) { return <CompatIcon {...props} />; }
export function GripVertical(props: IconProps) { return <CompatIcon {...props} />; }
export function Eye(props: IconProps) { return <CompatIcon {...props} />; }
export function EyeOff(props: IconProps) { return <CompatIcon {...props} />; }
export function GitCommitVertical(props: IconProps) { return <CompatIcon {...props} />; }
export function Circle(props: IconProps) { return <CompatIcon {...props} />; }
export function Star(props: IconProps) { return <CompatIcon {...props} />; }
