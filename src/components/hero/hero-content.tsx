import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

/**
 * Hero copy: eyebrow, editorial headline, supporting paragraph and the
 * primary/secondary call to action. Pure presentation — no data fetching,
 * so it can be dropped into any future layout.
 */
export function HeroContent({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <p
        className="hero-rise eyebrow flex items-center gap-3 text-[0.5625rem] text-muted-foreground"
        style={{ "--delay": "80ms" } as React.CSSProperties}
      >
        <span aria-hidden className="h-px w-8 bg-champagne" />
        Maison Mistyy · Creative House
      </p>

      <h1
        id="hero-heading"
        className="mt-6 font-serif text-[clamp(2.55rem,5.2vw,4.5rem)] font-light leading-[0.98] tracking-[-0.012em] text-balance text-espresso sm:mt-8">
        <span
          className="hero-rise block"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          Your Imagination.
        </span>
        <span
          className="hero-rise block italic text-espresso/85"
          style={{ "--delay": "330ms" } as React.CSSProperties}
        >
          Our Creative
        </span>
        <span
          className="hero-rise block"
          style={{ "--delay": "450ms" } as React.CSSProperties}
        >
          Intelligence.
        </span>
      </h1>

      <p
        className="hero-rise mt-7 max-w-[34rem] text-pretty text-[0.95rem] leading-[1.75] text-espresso/70 sm:text-base"
        style={{ "--delay": "600ms" } as React.CSSProperties}
      >
        Explore a world where artificial intelligence meets creativity. Discover
        visual experiences, creative resources, digital education and tools
        designed to help you create more.
      </p>

      <div
        className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        style={{ "--delay": "720ms" } as React.CSSProperties}
      >
        <Button
          asChild
          size="lg"
          className="group h-12 rounded-none px-7 text-[0.6875rem] uppercase tracking-[0.22em]"
        >
          <Link href="/studio">
            Explore Our Services
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.4}
            />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="group h-12 rounded-none border-espresso/30 px-7 text-[0.6875rem] uppercase tracking-[0.22em] text-espresso"
        >
          <Link href="/academy">
            Discover Masterclasses
            <ArrowUpRight
              aria-hidden
              className="size-3.5 text-champagne transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.4}
            />
          </Link>
        </Button>
      </div>

      <div
        className="hero-rise mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-espresso/12 pt-6 sm:mt-14"
        style={{ "--delay": "860ms" } as React.CSSProperties}
      >
        <span className="eyebrow text-[0.5rem] text-muted-foreground">
          Est. {SITE.location.split(" · ")[0]}
        </span>
        <span aria-hidden className="hidden h-3 w-px bg-espresso/15 sm:block" />
        <span className="eyebrow text-[0.5rem] text-muted-foreground">
          Photography · Visual Direction · AI
        </span>
      </div>
    </div>
  );
}
