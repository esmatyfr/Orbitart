import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.54 7.48L3.5 20.5l1.55-4.3A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="M8.2 7.7c.2-.43.4-.44.62-.44h.45c.18 0 .4.07.52.36l.75 1.82c.09.22.07.4-.08.62l-.58.78c-.15.2-.17.38-.05.58a7.1 7.1 0 0 0 1.92 2.03c.24.15.44.13.63-.08l.8-.93c.18-.21.4-.27.64-.18l1.95.91c.24.11.37.3.39.52.02.28-.09.9-.24 1.24-.17.36-.88.7-1.21.79-.33.08-.76.12-1.23-.04-.4-.13-.9-.29-1.55-.57a10.5 10.5 0 0 1-4.36-3.85c-.5-.7-.85-1.48-.85-2.25 0-.74.38-1.14.45-1.31Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.7" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ShopIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 10.5V20h16v-9.5" />
      <path d="M3 9.5 5.25 4h13.5L21 9.5" />
      <path d="M3 9.5a2.25 2.25 0 0 0 4.5 0 2.25 2.25 0 0 0 4.5 0 2.25 2.25 0 0 0 4.5 0 2.25 2.25 0 0 0 4.5 0" />
      <path d="M9 20v-5h6v5" />
    </svg>
  );
}
