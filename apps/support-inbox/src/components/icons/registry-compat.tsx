import type { SVGProps } from "react";
import { ArrowLeftIcon } from "./arrow-left";
import { BookIcon } from "./book";
import { CheckIcon } from "./check";
import { GroupIcon } from "./group";
import { MessageIcon } from "./message";
import { NavArrowDownIcon } from "./nav-arrow-down";
import { NavArrowRightIcon } from "./nav-arrow-right";

type IconProps = SVGProps<SVGSVGElement>;

export const Activity = MessageIcon;
export const ArrowDownFromLine = NavArrowDownIcon;
export const ArrowUpFromLine = NavArrowDownIcon;
export const Calendar = BookIcon;
export const CalendarIcon = BookIcon;
export const Check = CheckIcon;
export const ChevronDown = NavArrowDownIcon;
export const ChevronLeft = ArrowLeftIcon;
export const ChevronRight = NavArrowRightIcon;
export const ChevronUp = NavArrowDownIcon;
export const ChevronsUpDown = NavArrowDownIcon;
export const Circle = MessageIcon;
export const Copy = BookIcon;
export const Dot = MessageIcon;
export const Eye = MessageIcon;
export const EyeOff = MessageIcon;
export const FileText = BookIcon;
export const Footprints = GroupIcon;
export const GitCommitVertical = MessageIcon;
export const GripVertical = GroupIcon;
export const Minus = MessageIcon;
export const MoreHorizontal = MessageIcon;
export const Pencil = MessageIcon;
export const Plus = MessageIcon;
export const Search = MessageIcon;
export const Star = CheckIcon;
export const TrendingDown = NavArrowDownIcon;
export const TrendingUp = NavArrowRightIcon;
export const Upload = NavArrowUpIcon;
export const Waves = MessageIcon;
export const X = MessageIcon;

// Keep the compatibility module's public shape explicit for generated registry files.
export type { IconProps };

function NavArrowUpIcon(props: IconProps) {
  return <NavArrowDownIcon {...props} className={props.className} />;
}
