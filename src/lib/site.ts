/**
 * Site-level navigation and copy. Kept in one place so the header, the
 * mobile drawer and future sections all read from the same definition.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "The Studio", href: "/studio" },
  { label: "The Vault", href: "/vault" },
  { label: "The Academy", href: "/academy" },
  { label: "The Bookshelf", href: "/bookshelf" },
  { label: "The Marketplace", href: "/marketplace" },
  { label: "The Creative Lab", href: "/creative-lab" },
  { label: "The Community", href: "/community" },
];

/** Utility controls, surfaced as icons on desktop and rows on mobile. */
export const UTILITY_NAV: NavItem[] = [
  { label: "Search", href: "/search" },
  { label: "Customer Account", href: "/account" },
  { label: "Shopping Cart", href: "/cart" },
];

export const SITE = {
  name: "MAISON MISTYY",
  tagline: "Your Imagination. Our Creative Intelligence.",
  description:
    "A luxury creative house and digital learning ecosystem where artificial intelligence meets imagination — visual direction, photography, education and digital products.",
  location: "Dar es Salaam · Working Worldwide",
} as const;
