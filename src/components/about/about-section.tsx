import { getImage } from "@/lib/images";
import { ScrollReveal } from "./scroll-reveal";
import "./about.css";

const values = [
  {
    title: "Creativity",
    description: "Exploring new possibilities through imagination.",
  },
  { title: "Innovation", description: "Using technology thoughtfully." },
  {
    title: "Excellence",
    description: "Paying attention to quality and detail.",
  },
  {
    title: "Empowerment",
    description: "Helping people develop creative capabilities.",
  },
] as const;

function AboutVisual() {
  const primary = getImage("image-04");
  const secondary = getImage("image-05");

  return (
    <div
      className="relative mx-auto w-full max-w-[39rem] lg:ml-auto"
      data-reveal
    >
      <div
        aria-hidden
        className="absolute inset-x-4 bottom-8 top-7 border border-champagne/40 sm:inset-x-8 sm:bottom-10 sm:top-10"
      />
      <div className="relative grid grid-cols-[minmax(0,1fr)_minmax(0,0.53fr)] items-end gap-3 sm:gap-5">
        <figure className="min-w-0">
          <div className="bg-beige shadow-[0_24px_65px_-36px_rgba(53,37,31,0.45)]">
            {/* Original file, displayed in its natural proportions without cropping. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={primary.src}
              alt={primary.alt}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-4 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-champagne" />
            <span className="eyebrow text-[0.5rem] leading-relaxed text-muted-foreground">
              A study in possibility
            </span>
          </figcaption>
        </figure>
        <figure className="min-w-0 pb-12 sm:pb-16">
          <div className="bg-beige shadow-[0_24px_65px_-36px_rgba(53,37,31,0.45)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={secondary.src}
              alt={secondary.alt}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 font-serif text-sm italic text-espresso/65">
            The creative house
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="about-section relative bg-background text-espresso"
    >
      <ScrollReveal>
        <div className="mx-auto max-w-[100rem] px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 xl:px-12 xl:pb-36 xl:pt-32">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 xl:gap-28">
            <div className="max-w-[36rem]" data-reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 shrink-0 bg-champagne" />
                <p className="eyebrow text-[0.625rem] leading-relaxed text-muted-foreground">
                  The House of Maison Mistyy
                </p>
              </div>
              <h2
                id="about-heading"
                className="mt-7 font-serif text-[clamp(2.8rem,5vw,5rem)] font-light leading-[0.98] tracking-[-0.015em] sm:mt-9"
              >
                Where Creativity{" "}
                <span className="italic">Meets Intelligence.</span>
              </h2>
              <div className="mt-8 max-w-[32rem] space-y-5 text-[0.95rem] leading-[1.9] text-muted-foreground sm:mt-10 sm:text-base">
                <p>
                  MAISON MISTYY is a creative house exploring the intersection
                  of artificial intelligence, visual storytelling, digital
                  education and innovation.
                </p>
                <p>
                  We bring together creative direction, AI-powered visual
                  experiences, educational resources and digital products to
                  help individuals and brands turn imagination into meaningful
                  creative possibilities.
                </p>
              </div>
            </div>
            <AboutVisual />
          </div>

          <div className="mt-24 grid gap-12 border-t border-espresso/15 pt-10 sm:mt-32 sm:pt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 xl:mt-40 xl:gap-28">
            <div data-reveal>
              <p className="eyebrow text-[0.625rem] leading-relaxed text-muted-foreground">
                Our Philosophy
              </p>
              <h3 className="mt-6 max-w-[32rem] font-serif text-[clamp(2.4rem,4vw,4rem)] font-light leading-[1.02] tracking-[-0.01em]">
                Creativity Has <span className="italic">No Boundaries.</span>
              </h3>
              <p className="mt-7 max-w-[32rem] text-[0.95rem] leading-[1.9] text-muted-foreground sm:text-base">
                We believe technology should expand human creativity, not
                replace it. Our approach combines imagination, thoughtful visual
                direction and intelligent tools to create experiences that
                inspire people to explore what is possible.
              </p>
            </div>
            <div
              className="grid gap-9 sm:grid-cols-2 sm:gap-10 lg:pt-1"
              data-reveal
            >
              <div className="border-t border-champagne pt-5">
                <h3 className="eyebrow text-[0.625rem] leading-relaxed">
                  Our Vision
                </h3>
                <p className="mt-5 text-[0.95rem] leading-[1.85] text-muted-foreground">
                  To build an internationally recognised creative ecosystem
                  where technology, imagination and education empower a new
                  generation of creators.
                </p>
              </div>
              <div className="border-t border-champagne pt-5">
                <h3 className="eyebrow text-[0.625rem] leading-relaxed">
                  Our Mission
                </h3>
                <p className="mt-5 text-[0.95rem] leading-[1.85] text-muted-foreground">
                  To make creative technology, visual storytelling and digital
                  learning more accessible through innovative services,
                  educational experiences and carefully developed creative
                  resources.
                </p>
              </div>
            </div>
          </div>

          <div
            className="mt-24 border-t border-espresso/15 pt-10 sm:mt-32 sm:pt-14"
            data-reveal
          >
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="eyebrow text-[0.625rem] leading-relaxed text-muted-foreground">
                  The principles of the house
                </p>
                <h3 className="mt-4 font-serif text-4xl font-light sm:text-5xl">
                  Our Values<span className="text-champagne">.</span>
                </h3>
              </div>
              <span
                aria-hidden
                className="eyebrow text-[0.5rem] text-muted-foreground"
              >
                01 — 04
              </span>
            </div>
            <div className="mt-9 grid grid-cols-1 gap-px border border-espresso/10 bg-espresso/10 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <article
                  key={value.title}
                  className="flex min-h-[13rem] flex-col bg-[#fbf9f5] px-6 py-7 sm:px-7 sm:py-8"
                >
                  <span
                    aria-hidden
                    className="eyebrow text-[0.5rem] text-champagne"
                  >
                    0{index + 1}
                  </span>
                  <h4 className="mt-8 font-serif text-[1.8rem] font-light leading-none">
                    {value.title}
                  </h4>
                  <p className="mt-4 max-w-[15rem] text-sm leading-[1.75] text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
