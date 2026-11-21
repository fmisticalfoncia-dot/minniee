import Link from "next/link";

import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

/**
 * The wordmark: a serif house name over a hairline rule, with the motto in
 * small caps beneath. Used in the header and the mobile drawer.
 */
export function BrandMark({
  className,
  size = "default",
  asLink = true,
  monogram = false,
}: {
  className?: string;
  size?: "default" | "lg";
  asLink?: boolean;
  /** Force the stacked MM monogram instead of the full wordmark. */
  monogram?: boolean;
}) {
  const compact = monogram;

  const content = compact ? (
    <span className="group/brand inline-flex items-center gap-2.5 leading-none">
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-full border border-champagne/60"
      >
        <span className="font-serif text-[0.8125rem] font-normal leading-none tracking-[0.04em] text-espresso">
          MM
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[0.95rem] font-light tracking-[0.16em] text-espresso">
          {SITE.name}
        </span>
        <span className="mt-1 text-[0.375rem] uppercase tracking-[0.34em] text-muted-foreground">
          Creative Intelligence
        </span>
      </span>
    </span>
  ) : (
    <span className="group/brand inline-flex flex-col items-start leading-none">
      <span
        className={cn(
          "font-serif font-light tracking-[0.18em] text-espresso transition-colors duration-500 group-hover/brand:text-espresso/80",
          size === "lg" ? "text-[1.75rem] sm:text-[2rem]" : "text-[1.2rem]",
        )}
      >
        {SITE.name}
      </span>
      <span
        aria-hidden
        className={cn(
          "mt-1.5 h-px w-full origin-left bg-champagne transition-transform duration-500 group-hover/brand:scale-x-100",
          size === "lg" ? "scale-x-100" : "scale-x-[0.55] group-hover/brand:scale-x-100",
        )}
      />
      <span className="mt-1.5 text-[0.5rem] font-normal uppercase tracking-[0.42em] text-muted-foreground">
        Creative Intelligence
      </span>
    </span>
  );

  if (!asLink) {
    return <div className={cn("inline-flex", className)}>{content}</div>;
  }

  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — home`}
      className={cn("inline-flex", className)}
    >
      {content}
    </Link>
  );
}
