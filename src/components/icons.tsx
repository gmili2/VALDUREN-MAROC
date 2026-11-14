type P = { color?: string; size?: number; fill?: string };

const svg = (size: number, color: string, children: React.ReactNode, sw = 1.4, fill = 'none') => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} aria-hidden="true">
    {children}
  </svg>
);

export const SearchIcon = ({ color = 'currentColor', size = 20 }: P) =>
  svg(size, color, <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>);
export const UserIcon = ({ color = 'currentColor', size = 20 }: P) =>
  svg(size, color, <><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20c1.2-3.8 4-5.6 7.5-5.6s6.3 1.8 7.5 5.6" /></>);
export const BagIcon = ({ color = 'currentColor', size = 20 }: P) =>
  svg(size, color, <><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6.5a3 3 0 016 0V8" /></>, 1.5);
export const ArrowIcon = ({ color = 'currentColor', size = 16 }: P) =>
  svg(size, color, <path d="M5 12h14M13 6l6 6-6 6" />, 1.5);
export const CloseIcon = ({ color = 'currentColor', size = 18 }: P) =>
  svg(size, color, <path d="M6 6l12 12M18 6L6 18" />);
export const MenuIcon = ({ color = 'currentColor', size = 22 }: P) =>
  svg(size, color, <path d="M3.5 9h17M3.5 15h17" />);
export const HeartIcon = ({ color = 'currentColor', size = 17, fill = 'none' }: P) =>
  svg(size, color, <path d="M12 20s-7-4.4-7-9.6A4 4 0 0112 8a4 4 0 017 2.4C19 15.6 12 20 12 20z" />, 1.4, fill);
export const TruckIcon = ({ color = 'currentColor', size = 22 }: P) =>
  svg(size, color, <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></>, 1.2);
export const BottleIcon = ({ color = 'currentColor', size = 22 }: P) =>
  svg(size, color, <><rect x="10" y="2.5" width="4" height="3" rx=".5" /><path d="M10.5 5.5h3v2.5h-3z" /><rect x="6" y="8" width="12" height="13.5" rx="1.5" /></>, 1.2);
export const ShieldIcon = ({ color = 'currentColor', size = 22 }: P) =>
  svg(size, color, <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>, 1.2);
export const ChatIcon = ({ color = 'currentColor', size = 22 }: P) =>
  svg(size, color, <path d="M4 5h16v11H9l-5 4V5z" />, 1.2);
