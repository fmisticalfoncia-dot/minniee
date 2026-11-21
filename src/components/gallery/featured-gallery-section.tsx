import { ScrollReveal } from "@/components/about/scroll-reveal";
import { FeaturedGallery } from "./featured-gallery";
import "./gallery.css";

export function FeaturedGallerySection() {
  return (
    <section
      id="featured-photography"
      aria-labelledby="gallery-heading"
      className="gallery-section bg-background text-espresso"
    >
      <ScrollReveal>
        <div className="mx-auto max-w-[100rem] px-5 pb-24 sm:px-8 sm:pb-32 xl:px-12 xl:pb-40">
          <div className="border-t border-espresso/15 pt-6" data-reveal>
            <div className="flex items-center justify-between gap-5">
              <h2
                id="gallery-heading"
                className="eyebrow text-[0.625rem] leading-relaxed text-muted-foreground"
              >
                The Art of AI Photography
              </h2>
              <span aria-hidden className="h-px w-10 bg-champagne sm:w-16" />
            </div>
            <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)] lg:items-end lg:gap-16">
              <p className="max-w-[46rem] font-serif text-[clamp(2.8rem,5vw,5rem)] font-light leading-[0.98] tracking-[-0.015em]">
                Visual Stories.{" "}
                <span className="italic">Imagination Without Limits.</span>
              </p>
              <p className="max-w-[28rem] text-[0.95rem] leading-[1.9] text-muted-foreground sm:text-base lg:pb-1">
                Explore selected visual creations from the MAISON MISTYY
                creative studio. Each image represents a different creative
                direction, visual concept and storytelling possibility.
              </p>
            </div>
          </div>
          <FeaturedGallery />
        </div>
      </ScrollReveal>
    </section>
  );
}
