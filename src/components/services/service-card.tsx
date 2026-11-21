import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EditorialImage } from "@/lib/images";
import type { Service } from "./services-data";

type ServiceCardProps = {
  service: Service;
  index: number;
  image?: EditorialImage;
  featured?: boolean;
};

export function ServiceCard({
  service,
  index,
  image,
  featured = false,
}: ServiceCardProps) {
  return (
    <article
      data-reveal
      className={`group flex h-full flex-col border border-espresso/12 bg-card transition-colors duration-500 hover:border-champagne/70 ${featured ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)]" : ""}`}
    >
      <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-9 xl:p-11">
        <div className="flex items-center justify-between gap-4 border-b border-espresso/10 pb-5">
          <span className="eyebrow text-[0.5625rem] leading-relaxed text-muted-foreground">
            Maison Mistyy · {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden
            className="h-px w-7 bg-champagne transition-[width] duration-500 group-hover:w-10"
          />
        </div>

        <div className="mt-7 flex items-start justify-between gap-5 sm:mt-9">
          <div className="min-w-0">
            <h3 className="font-serif text-[clamp(2rem,2.8vw,3rem)] font-light leading-[1.05] tracking-[-0.01em]">
              {service.title}
            </h3>
            <p className="mt-4 max-w-[30rem] text-[0.9375rem] leading-[1.8] text-muted-foreground sm:mt-5">
              {service.description}
            </p>
          </div>
          {image && !featured && (
            <div className="hidden w-[30%] max-w-[9rem] shrink-0 bg-beige sm:block">
              {/* The original is displayed in its natural proportions. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          )}
        </div>

        <ul
          className={`mt-7 grid gap-x-6 gap-y-2.5 border-t border-espresso/10 pt-6 text-sm leading-relaxed text-espresso/75 ${featured ? "sm:grid-cols-2" : ""}`}
        >
          {service.offerings.map((offering) => (
            <li key={offering} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-[0.65em] h-px w-3 shrink-0 bg-champagne"
              />
              <span>{offering}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-9">
          <Link
            href={service.href}
            className="group/link inline-flex items-center gap-3 border-b border-espresso/30 pb-2 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:border-champagne focus-visible:border-champagne"
          >
            {service.cta}
            <ArrowUpRight
              aria-hidden
              className="size-4 text-champagne transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              strokeWidth={1.4}
            />
          </Link>
        </div>
      </div>
      {image && featured && (
        <figure className="relative mx-6 mb-6 sm:mx-9 sm:mb-9 lg:my-9 lg:ml-0 lg:mr-9 xl:my-11 xl:mr-11">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 top-6 border border-champagne/45"
          />
          <div className="relative mx-5 bg-beige sm:mx-8">
            {/* No crop, filter, or transformed source URL is applied. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="relative mx-5 pb-5 pt-4 font-serif text-sm italic text-espresso/65 sm:mx-8">
            From the Maison Mistyy archive
          </figcaption>
        </figure>
      )}
    </article>
  );
}
