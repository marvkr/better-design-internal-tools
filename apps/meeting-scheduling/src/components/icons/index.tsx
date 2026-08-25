import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
function Icon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>{children}</svg>;
}
export const CalendarDuotoneIcon = (p: IconProps) => <Icon {...p}><path opacity=".2" d="M40 80h176v128a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V80Z"/><path d="M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm0 176H48V96h160v112Zm0-128H48V48h24v8a8 8 0 0 0 16 0v-8h80v8a8 8 0 0 0 16 0v-8h24v32Z"/></Icon>;
export const ChartBarDuotoneIcon = (p: IconProps) => <Icon {...p}><path opacity=".2" d="M152 40h56v168h-56z"/><path d="M224 200h-8V40a8 8 0 0 0-8-8h-56a8 8 0 0 0-8 8v40H96a8 8 0 0 0-8 8v40H48a8 8 0 0 0-8 8v64h-8a8 8 0 0 0 0 16h192a8 8 0 0 0 0-16ZM160 48h40v152h-40Zm-56 48h40v104h-40Zm-48 48h32v56H56Z"/></Icon>;
export const UsersDuotoneIcon = (p: IconProps) => <Icon {...p}><path opacity=".2" d="M136 108a52 52 0 1 1-52-52 52 52 0 0 1 52 52Z"/><path d="M117 158a60 60 0 1 0-66 0 96 96 0 0 0-47 38 8 8 0 1 0 13 9 80 80 0 0 1 134 0 8 8 0 0 0 13-9 96 96 0 0 0-47-38ZM40 108a44 44 0 1 1 44 44 44 44 0 0 1-44-44Z"/></Icon>;
export const ClockDuotoneIcon = (p: IconProps) => <Icon {...p}><path opacity=".2" d="M224 128a96 96 0 1 1-96-96 96 96 0 0 1 96 96Z"/><path d="M128 24a104 104 0 1 0 104 104A104 104 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88 88 0 0 1-88 88Zm64-88a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 8 8Z"/></Icon>;
export const CheckDuotoneIcon = (p: IconProps) => <Icon {...p}><path opacity=".2" d="M232 56v144a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h176a16 16 0 0 1 16 16Z"/><path d="m205.7 85.7-96 96a8 8 0 0 1-11.4 0l-40-40a8 8 0 1 1 11.4-11.4l34.3 34.4 90.3-90.4a8 8 0 0 1 11.4 11.4Z"/></Icon>;
export const ArrowRightDuotoneIcon = (p: IconProps) => <Icon {...p}><path opacity=".2" d="m216 128-72 72V56Z"/><path d="m221.7 122.3-72-72A8 8 0 0 0 136 56v64H40a8 8 0 0 0 0 16h96v64a8 8 0 0 0 13.7 5.7l72-72a8 8 0 0 0 0-11.4Z"/></Icon>;
export const ArrowLeftDuotoneIcon = (p: IconProps) => <Icon {...p}><path opacity=".2" d="M112 56v144l-72-72Z"/><path d="M216 120h-96V56a8 8 0 0 0-13.7-5.7l-72 72a8 8 0 0 0 0 11.4l72 72A8 8 0 0 0 120 200v-64h96a8 8 0 0 0 0-16Z"/></Icon>;
export const NoteDuotoneIcon = (p: IconProps) => <Icon {...p}><path opacity=".2" d="m216 160-56 56v-56Z"/><path d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h108.7a16 16 0 0 0 11.3-4.7l44.6-44.6a16 16 0 0 0 4.7-11.3V48a16 16 0 0 0-16-16ZM48 48h160v104h-48a8 8 0 0 0-8 8v48H48Zm120 148.7V168h28.7Z"/></Icon>;
export const WarningCircleDuotoneIcon = (p: IconProps) => <Icon {...p}><path opacity=".2" d="M224 128a96 96 0 1 1-96-96 96 96 0 0 1 96 96Z"/><path d="M128 24a104 104 0 1 0 104 104A104 104 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88 88 0 0 1-88 88Zm-8-80V80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm20 36a12 12 0 1 1-12-12 12 12 0 0 1 12 12Z"/></Icon>;
export const XDuotoneIcon = (p: IconProps) => <Icon {...p}><path d="m205.7 194.3a8 8 0 0 1-11.4 11.4L128 139.3l-66.3 66.4a8 8 0 0 1-11.4-11.4l66.4-66.3-66.4-66.3a8 8 0 0 1 11.4-11.4l66.3 66.4 66.3-66.4a8 8 0 0 1 11.4 11.4L139.3 128Z"/></Icon>;

// The generated registry includes optional demo primitives that expect a large
// icon surface. Keep those components on the assigned Phosphor/duotone family.
const RegistryIcon = (p: IconProps) => <Icon {...p}><path d="M128 24a104 104 0 1 0 104 104A104 104 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88 88 0 0 1-88 88Z"/><path d="m80 128 32 32 64-64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></Icon>;
export const Activity = RegistryIcon;
export const ArrowDown = RegistryIcon;
export const ArrowDownFromLine = RegistryIcon;
export const ArrowDownRight = RegistryIcon;
export const ArrowLeft = RegistryIcon;
export const ArrowRight = RegistryIcon;
export const ArrowUp = RegistryIcon;
export const ArrowUpDown = RegistryIcon;
export const ArrowUpFromLine = RegistryIcon;
export const ArrowUpRight = RegistryIcon;
export const CalendarIcon = CalendarDuotoneIcon;
export const Check = CheckDuotoneIcon;
export const ChevronDown = RegistryIcon;
export const ChevronLeft = ArrowLeftDuotoneIcon;
export const ChevronRight = ArrowRightDuotoneIcon;
export const ChevronUp = RegistryIcon;
export const ChevronsUpDown = RegistryIcon;
export const Circle = RegistryIcon;
export const Clock = ClockDuotoneIcon;
export const Copy = NoteDuotoneIcon;
export const Eye = RegistryIcon;
export const EyeOff = RegistryIcon;
export const File = NoteDuotoneIcon;
export const FileIcon = NoteDuotoneIcon;
export const Footprints = UsersDuotoneIcon;
export const GitCommitVertical = RegistryIcon;
export const GripVertical = RegistryIcon;
export const Minus = RegistryIcon;
export const MoreHorizontal = RegistryIcon;
export const Pencil = NoteDuotoneIcon;
export const Search = RegistryIcon;
export const Star = RegistryIcon;
export const TrendingDown = RegistryIcon;
export const TrendingUp = RegistryIcon;
export const Upload = RegistryIcon;
export const Waves = RegistryIcon;
export const X = XDuotoneIcon;
