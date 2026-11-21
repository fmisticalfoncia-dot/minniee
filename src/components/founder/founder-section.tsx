import { ScrollReveal } from "@/components/about/scroll-reveal";
import "./founder.css";

const FOUNDER_PORTRAIT =
  "https://res.cloudinary.com/mjmmjbqu/image/upload/v1789629516/WhatsApp_Image_2026-09-16_at_12.51.44_qmytfv.jpg";

export function FounderSection() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="founder-section relative bg-background text-espresso"
    >
      <ScrollReveal>
        <div className="mx-auto max-w-[100rem] px-5 pb-24 sm:px-8 sm:pb-32 xl:px-12 xl:pb-40">
          <div className="flex items-center justify-between gap-5 border-t border-espresso/15 pt-6">
            <p className="eyebrow text-[0.625rem] leading-relaxed text-muted-foreground">
              Meet the Founder
            </p>
            <span aria-hidden className="h-px w-10 bg-champagne sm:w-16" />
          </div>

          <div className="mt-14 grid items-center gap-14 sm:mt-20 sm:gap-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20 xl:gap-28">
            <figure
              className="group relative mx-auto w-full max-w-[35rem] lg:ml-0"
              data-reveal
            >
              {/* The frame is decorative; the original photograph remains untouched. */}
              <div
                aria-hidden
                className="absolute inset-x-3 -bottom-3 top-6 border border-champagne/45 transition-colors duration-700 group-hover:border-champagne sm:inset-x-5 sm:-bottom-5 sm:top-8"
              />
              <div className="relative mx-7 bg-beige shadow-[0_24px_65px_-36px_rgba(53,37,31,0.45)] transition-shadow duration-700 group-hover:shadow-[0_32px_75px_-36px_rgba(53,37,31,0.55)] sm:mx-12">
                {/* Plain img and natural height preserve the supplied file and its proportions. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FOUNDER_PORTRAIT}
                  alt="Misticalfoncia, founder and creative director of Maison Mistyy"
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="relative mx-7 mt-8 flex items-center gap-3 sm:mx-12 sm:mt-10">
                <span aria-hidden className="h-px w-6 shrink-0 bg-champagne" />
                <span className="eyebrow text-[0.5rem] leading-relaxed text-muted-foreground">
                  Misticalfoncia · Founder &amp; Creative Director
                </span>
              </figcaption>
            </figure>

            <div className="max-w-[36rem] lg:py-8" data-reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 shrink-0 bg-champagne" />
                <p className="eyebrow text-[0.625rem] leading-relaxed text-muted-foreground">
                  The Woman Behind the House
                </p>
              </div>
              <h2
                id="founder-heading"
                className="mt-7 font-serif text-[clamp(2.8rem,5vw,5rem)] font-light leading-[0.98] tracking-[-0.015em] sm:mt-9"
              >
                Meet <span className="italic">Misticalfoncia.</span>
              </h2>
              <p className="eyebrow mt-6 text-[0.625rem] leading-relaxed text-espresso/75 sm:mt-8">
                Founder &amp; Creative Director
              </p>
              <div className="mt-8 max-w-[32rem] space-y-5 text-[0.95rem] leading-[1.9] text-muted-foreground sm:mt-10 sm:text-base">
                <p>
                  Behind MAISON MISTYY is Misticalfoncia, a creative
                  entrepreneur exploring the intersection of artificial
                  intelligence, visual storytelling, creativity and digital
                  education.
                </p>
                <p>
                  Through MAISON MISTYY, she is building a creative ecosystem
                  that brings together AI-powered visual experiences, creative
                  resources, education and digital innovation.
                </p>
              </div>
              <blockquote className="mt-10 max-w-[31rem] border-l border-champagne pl-6 font-serif text-[1.5rem] font-light italic leading-[1.3] text-espresso/80 sm:mt-12 sm:pl-8 sm:text-[1.8rem]">
                “An imagination-led approach to building, creating and exploring
                what technology makes possible.”
              </blockquote>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
