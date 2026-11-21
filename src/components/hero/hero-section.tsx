import { cn } from "@/lib/utils";
import { HeroContent } from "@/components/hero/hero-content";
import { HeroGallery } from "@/components/hero/hero-gallery";

/**
 * The opening spread: editorial split on desktop (copy left, triptych
 * right), stacked on tablet and phone with the copy first and three
 * images below, never overlapping the text.
 */
export function HeroSection({ className }: { className?: string }) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className={cn(
        "paper-grain relative overflow-hidden bg-background",
        className,
      )}
    >
      {/* Vertical hairline guides — a faint grid, like a layout board. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <div className="mx-auto flex h-full max-w-[100rem] px-8 xl:px-12">
          <div className="h-full w-px bg-espresso/[0.055]" />
          <div className="h-full flex-1" />
          <div className="h-full w-px bg-espresso/[0.055]" />
          <div className="h-full flex-1" />
          <div className="h-full w-px bg-espresso/[0.055]" />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[100rem] grid-cols-1 items-center gap-14 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20 xl:gap-24 xl:px-12">
        <HeroContent className="max-w-[38rem]" />

        <HeroGallery className="lg:mt-2 lg:-mr-4 xl:-mr-8" />
      </div>

      {/* Scroll cue — quiet, centred on the rule at the base of the hero. */}
      <div className="relative mx-auto max-w-[100rem] px-5 pb-10 sm:px-8 xl:px-12">
        <div className="flex items-center justify-between gap-6 border-t border-espresso/12 pt-5">
          <p className="eyebrow text-[0.5rem] text-muted-foreground">
            Maison Mistyy
          </p>
          <p className="eyebrow hidden text-[0.5rem] text-muted-foreground sm:block">
            Scroll to enter the house
          </p>
          <p className="eyebrow text-[0.5rem] text-muted-foreground">
            MMXXVI
          </p>
        </div>
      </div>
    </section>
  );
}
