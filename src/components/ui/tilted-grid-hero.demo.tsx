import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { ALL_IMAGES } from "@/lib/images";

/**
 * Demo wiring for the curved band. It reads the registered original
 * collection, so the demo never references an image that is not part of
 * the house assets. Drop <TiltedGridHeroDemo /> into any page to preview
 * the band; the hero itself does not use it yet.
 */
export default function TiltedGridHeroDemo() {
  const images = ALL_IMAGES.map(({ src, alt }) => ({ src, alt }));

  return (
    <TiltedGridHero
      images={images}
      className="h-[560px] w-full rounded-lg border border-border bg-background"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center">
        <div className="px-6">
          <h1 className="text-balance font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            Every frame,
            <br />
            brought into focus.
          </h1>
        </div>
        <p className="max-w-md text-balance px-6 text-sm text-muted-foreground">
          Images curve in from one edge, flatten out at the centre, then fade
          away round the other.
        </p>
      </div>
    </TiltedGridHero>
  );
}
