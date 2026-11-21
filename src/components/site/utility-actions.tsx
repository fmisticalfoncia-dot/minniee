import Link from "next/link";
import { Search, ShoppingBag, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { UTILITY_NAV } from "@/lib/site";

const ICONS = {
  Search,
  "Customer Account": UserRound,
  "Shopping Cart": ShoppingBag,
} as const;

/**
 * Reusable utility control: a labelled icon link. Used in the header rail,
 * and available to any future section that needs the same affordances.
 */
export function UtilityLink({
  label,
  href,
  className,
}: {
  label: string;
  href: string;
  className?: string;
}) {
  const Icon = ICONS[label as keyof typeof ICONS] ?? Search;

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={cn(
        "group relative inline-flex size-10 items-center justify-center text-espresso/70 transition-colors duration-300 hover:text-espresso focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-espresso/50",
        className,
      )}
    >
      <Icon className="size-[1.05rem]" strokeWidth={1.15} aria-hidden />
      {label === "Shopping Cart" ? (
        <span className="utility-count" aria-hidden>
          0
        </span>
      ) : null}
      <span className="pointer-events-none absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-champagne transition-all duration-400 group-hover:w-4" />
    </Link>
  );
}

export function UtilityActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      {UTILITY_NAV.map((item) => (
        <UtilityLink key={item.href} label={item.label} href={item.href} />
      ))}
    </div>
  );
}
